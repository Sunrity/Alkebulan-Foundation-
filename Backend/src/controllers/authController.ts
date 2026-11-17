import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "node:crypto";
import {
  createPasswordResetUrl,
  sendPasswordResetEmail,
  validatePasswordResetEmailConfig,
} from "../services/email.js";

// Define fallback secret to ensure a string parameter for JWT operations
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// ==========================================
// AUTHENTICATION CONTROLLERS
// ==========================================

// REGISTER A NEW USER (Student by default)
export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "STUDENT",
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Failed to create account. Please try again later." });
  }
};

// LOGIN EXISTING USER
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

const passwordResetRequestMessage =
  "If an account exists for that email, a reset link has been sent.";

export const requestPasswordReset = async (req: Request, res: Response) => {
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim() : "";

  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(200).json({ message: passwordResetRequestMessage });
  }

  try {
    validatePasswordResetEmailConfig();

    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { id: true, email: true, fullName: true },
    });

    if (!user) {
      return res.status(200).json({ message: passwordResetRequestMessage });
    }

    const cooldownStartedAt = new Date(Date.now() - 60_000);
    const recentToken = await prisma.passwordResetToken.findFirst({
      where: { userId: user.id, createdAt: { gt: cooldownStartedAt } },
      select: { id: true },
    });

    if (recentToken) {
      return res.status(200).json({ message: passwordResetRequestMessage });
    }

    const rawToken = randomBytes(32).toString("base64url");
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");

    await prisma.$transaction(async (transaction) => {
      await transaction.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });
      await transaction.passwordResetToken.create({
        data: {
          tokenHash,
          userId: user.id,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
      });
    });

    try {
      await sendPasswordResetEmail(
        user.email,
        user.fullName,
        createPasswordResetUrl(rawToken)
      );
    } catch (error) {
      await prisma.passwordResetToken.deleteMany({ where: { tokenHash } });
      throw error;
    }

    return res.status(200).json({ message: passwordResetRequestMessage });
  } catch (error) {
    console.error("Password reset request failed:", error);
    return res.status(503).json({
      message: "Password reset is temporarily unavailable. Please try again later.",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body || {};

  if (
    typeof token !== "string" ||
    token.length > 100 ||
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      message: "Use a valid reset link and a password between 8 and 72 bytes.",
    });
  }

  try {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      select: { id: true, userId: true, expiresAt: true },
    });

    if (!resetToken || resetToken.expiresAt <= new Date()) {
      return res.status(400).json({
        message: "This password reset link is invalid or has expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();
    const result = await prisma.$transaction(async (transaction) => {
      const consumedToken = await transaction.passwordResetToken.deleteMany({
        where: { id: resetToken.id, expiresAt: { gt: now } },
      });

      if (consumedToken.count !== 1) {
        return false;
      }

      await transaction.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      });

      await transaction.passwordResetToken.deleteMany({
        where: { userId: resetToken.userId },
      });

      return true;
    });

    if (!result) {
      return res.status(400).json({
        message: "This password reset link is invalid or has expired.",
      });
    }

    return res.status(200).json({
      message: "Password reset successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("Password reset failed:", error);
    return res.status(500).json({
      message: "Unable to reset your password right now. Please try again later.",
    });
  }
};

// ==========================================
// STUDENT MANAGEMENT CONTROLLERS
// ==========================================

export const getStudentsDashboard = async (_req: AuthRequest, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      select: {
        id: true,
        fullName: true,
        sex: true,
        age:true,
        email: true,
        createdAt: true,
        enrollments: {
          select: {
            id: true,
            status: true,
            enrolledAt: true,
            course: {
              select: { id: true, title: true, category: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to load admin dashboard" });
  }
};

export const getStudentById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid student ID format" });
  }

  try {
    const student = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        enrollments: { include: { course: true } },
      },
    });

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student details" });
  }
};

export const updateStudent = async (req: AuthRequest, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  const { fullName, email, password } = req.body;

  try {
    const data: Record<string, unknown> = {};
    if (fullName) data.fullName = fullName;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updatedStudent = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, fullName: true, email: true, updatedAt: true },
    });

    res.json({ message: "Student record updated", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Failed to update student" });
  }
};

export const updateEnrollmentStatus = async (req: AuthRequest, res: Response) => {
  const enrollmentId = Array.isArray(req.params.enrollmentId)
    ? req.params.enrollmentId[0]
    : req.params.enrollmentId;

  if (!enrollmentId) {
    return res.status(400).json({ message: "Enrollment ID is required" });
  }

  const { status } = req.body;

  try {
    const updated = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { status },
    });

    res.json({ message: "Enrollment status updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

export const deleteStudent = async (req: AuthRequest, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    // 1. Check if the ID belongs to a User
    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
      // Delete user's enrollments first to satisfy Foreign Key constraints
      await prisma.enrollment.deleteMany({ where: { userId: id } });
      await prisma.user.delete({ where: { id } });
      return res.json({ message: "Student and associated enrollments deleted" });
    }

    // 2. Fallback: check if the ID belongs directly to an Enrollment record
    const enrollment = await prisma.enrollment.findUnique({ where: { id } });

    if (enrollment) {
      await prisma.enrollment.delete({ where: { id } });
      return res.json({ message: "Enrollment record deleted" });
    }

    // 3. If neither exists in the database
    return res.status(404).json({ message: "Record not found" });
  } catch (error: any) {
    console.error("Delete student error:", error);
    return res.status(500).json({ message: "Failed to delete student record" });
  }
};