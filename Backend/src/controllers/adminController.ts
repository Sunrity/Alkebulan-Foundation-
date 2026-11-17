import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";

// Define fallback secret to ensure a guaranteed string parameter
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// Interface for custom JWT Payload shape
interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

// ==========================================
// MIDDLEWARES
// ==========================================

// Authenticate JWT Token
export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  // Split and extract the token string
  const token = authHeader.split(" ")[1];

  // Type guard: ensure token exists and is a valid string
  if (!token) {
    return res.status(401).json({ message: "Malformed authorization token" });
  }

  try {
    // Both 'token' and 'JWT_SECRET' are now guaranteed strings
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JWTPayload;

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Require Admin Role
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privileges required." });
  }
  next();
};

// ==========================================
// ENROLLMENT CONTROLLERS
// ==========================================

// Student Course Enrollment
export const enrollInCourse = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { courseId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    // Check if course exists
    const courseExists = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { userId, courseId },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    // Create enrollment record
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: "ACTIVE",
      },
      include: {
        course: true,
      },
    });

    res.status(201).json({
      message: "Successfully enrolled in course",
      enrollment,
    });
  } catch (error: any) {
    console.error("Enrollment error:", error);
    res.status(500).json({ message: "Failed to process course enrollment" });
  }
};

// Get All Enrollments (Admin View)
export const getAllStudentEnrollments = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    res.json(enrollments);
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    res.status(500).json({ message: "Failed to retrieve student enrollments" });
  }
};

// Get All Students with Enrollments (Admin View)
export const getAllStudents = async (_req: AuthRequest, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      select: {
        id: true,
        fullName: true,
        email: true,
        age: true,
        sex: true,
        createdAt: true,
        enrollments: {
          include: {
            course: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(students);
  } catch (error) {
    console.error("Fetch students error:", error);
    res.status(500).json({ message: "Failed to retrieve student records" });
  }
};

// Create a new course
export const createCourse = async (req: AuthRequest, res: Response) => {
  const { id, title, description, duration, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Course title is required" });
  }

  // Generate a URL-friendly slug ID if not explicitly provided
  const baseSlug = title.toLowerCase().trim().replace(/[^a-z0-9]/g, "-");
  const courseId = id || `${baseSlug}-${Date.now()}`;

  try {
    const existing = await prisma.course.findUnique({ where: { id: courseId } });
    if (existing) {
      return res.status(400).json({ message: "Course with this ID already exists" });
    }

    const newCourse = await prisma.course.create({
      data: {
        id: courseId,
        title,
        description: description || "",
        duration: duration || "8 Weeks",
        category: category || "General",
      },
    });

    return res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Create course error:", error);
    return res.status(500).json({ message: "Failed to create course" });
  }
};

// Delete a course
export const deleteCourse = async (req: AuthRequest, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    await prisma.course.delete({ where: { id } });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

// Get All Courses (Public / Student & Admin View)
export const getCourses = async (_req: AuthRequest, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(courses);
  } catch (error) {
    console.error("Fetch courses error:", error);
    res.status(500).json({ message: "Failed to retrieve courses" });
  }
};

// // Delete a student and their associated enrollments
// export const deleteStudent = async (req: AuthRequest, res: Response) => {
//   const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

//   if (!id) {
//     return res.status(400).json({ message: "Student ID is required" });
//   }

//   try {
//     // 1. Check if user or enrollment exists
//     const userExists = await prisma.user.findUnique({ where: { id } });

//     if (!userExists) {
//       // Fallback: check if the ID passed was actually an enrollment ID
//       const enrollmentExists = await prisma.enrollment.findUnique({ where: { id } });
      
//       if (enrollmentExists) {
//         await prisma.enrollment.delete({ where: { id } });
//         return res.json({ message: "Enrollment deleted successfully" });
//       }

//       return res.status(404).json({ message: "Student record not found" });
//     }

//     // 2. Delete student's enrollments first (to prevent foreign key errors)
//     await prisma.enrollment.deleteMany({
//       where: { userId: id },
//     });

//     // 3. Delete the student user
//     await prisma.user.delete({
//       where: { id },
//     });

//     return res.json({ message: "Student deleted successfully" });
//   } catch (error) {
//     console.error("Delete student error:", error);
//     return res.status(500).json({ message: "Failed to delete student" });
//   }
// };