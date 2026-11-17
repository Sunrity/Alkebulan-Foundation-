import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import type { AuthRequest } from "../middleware/auth.js";

// Guaranteed string fallback for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// ==========================================
// PUBLIC STUDENT AUTHENTICATION
// ==========================================

// 1. Student Signup
export const register = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        role: "STUDENT",
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
    });
  } catch (error) {
    console.error("Student registration error:", error);
    res.status(500).json({ message: "Error registering account" });
  }
};

// 2. Student Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
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
      user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
    });
  } catch (error) {
    console.error("Student login error:", error);
    res.status(500).json({ message: "Server login error" });
  }
};

// ==========================================
// COURSE & ENROLLMENT CONTROLLERS
// ==========================================

// 3. Get Available Skill Courses
export const getCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// 4. Enroll in a Course (Student Protected Route)
export const enrollInCourse = async (req: AuthRequest, res: Response) => {
  const { courseId, fullName, age, sex } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    // 1. Check if user exists and optionally update user details (fullName, age, sex)
    if (fullName || age || sex) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          ...(fullName && { fullName }),
          ...(age && { age: Number(age) }),
          ...(sex && { sex }),
        },
      });
    }

    // 2. Check if already enrolled
    const existing = await prisma.enrollment.findFirst({
      where: { userId, courseId },
    });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // 3. Create the enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: "ACTIVE",
      },
      include: {
        course: true,
        user: {
          select: { id: true, fullName: true, email: true, age: true, sex: true },
        },
      },
    });

    res.status(201).json({ message: "Successfully enrolled", enrollment });
  } catch (error) {
    console.error("Course enrollment error:", error);
    res.status(500).json({ message: "Enrollment failed" });
  }
};