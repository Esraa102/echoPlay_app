import express from "express";
import {
  checkAuth,
  deleteAccount,
  forgotPassword,
  login,
  logout,
  reSendVerifyCode,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("resend-code", reSendVerifyCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", login);
router.delete("/delete-account", deleteAccount);
router.get("/logout", logout);
router.get("/check-auth", verifyToken, checkAuth);

export default router;
