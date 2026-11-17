import express, { Router } from "express";
import {
  enrollInCourse,
  getAllStudentEnrollments,
  getAllStudents, 
  authenticateJWT,
  requireAdmin,
  createCourse,
  deleteCourse,
  getCourses,
} from "../controllers/adminController.js";

const router: Router = express.Router();

// Public / Student Routes
router.get("/courses", getCourses);
router.post("/enroll", authenticateJWT, enrollInCourse);

// Protected Admin Routes
router.get("/admin/students", authenticateJWT, requireAdmin, getAllStudents); // 👈 Added
router.get("/admin/enrollments", authenticateJWT, requireAdmin, getAllStudentEnrollments);
router.post("/admin/courses", authenticateJWT, requireAdmin, createCourse);
router.delete("/admin/courses/:id", authenticateJWT, requireAdmin, deleteCourse);

export default router;