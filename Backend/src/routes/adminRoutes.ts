import express, { Router } from "express";
import {
  authenticateJWT,
  requireAdmin,
  getAllStudentEnrollments,
} from "../controllers/adminController.js";
import {
  getStudentsDashboard,
  getStudentById,
  updateStudent,
  updateEnrollmentStatus,
  deleteStudent,
} from "../controllers/authController.js";

const router:Router = express.Router();

// Apply Authentication & Admin Authorization to all routes below
router.use(authenticateJWT, requireAdmin);

// ==========================================
// ADMIN DASHBOARD & STUDENT MANAGEMENT
// ==========================================

// Get list of all students and their enrollments
router.get("/students", getStudentsDashboard);

// Get single student details by ID
router.get("/students/:id", getStudentById);

// Update student account details
router.put("/students/:id", updateStudent);

// Delete student account (cascades enrollments)
router.delete("/students/:id", deleteStudent);

// ==========================================
// ENROLLMENT MANAGEMENT
// ==========================================

// Get all enrollments across all students
router.get("/enrollments", getAllStudentEnrollments);

// Update status of a specific enrollment (e.g., PENDING -> ACTIVE -> COMPLETED)
router.patch("/enrollments/:enrollmentId/status", updateEnrollmentStatus);

export default router;