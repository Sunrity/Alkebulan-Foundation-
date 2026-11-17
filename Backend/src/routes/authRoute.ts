import express, { Router } from "express";
import {
  register,
  login,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";

const router: Router = express.Router();

// Routes mounted at /api/auth
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;