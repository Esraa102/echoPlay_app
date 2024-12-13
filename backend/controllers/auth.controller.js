import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import {
  sendDeleteAccount,
  sendForgotPassword,
  sendResetSuccess,
  sendVerifyEmail,
  sendWelcomeEmail,
} from "../brevo/sendEmails.js";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All inputs are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({ message: "User already exists" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const code = Math.floor(100000 + Math.random() * 900000);
    const newUser = new User({
      username,
      email,
      image: `https://avatar.iran.liara.run/username?username=${username}`,
      password: hashedPassword,
      verificationToken: code,
      verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000, // valid for 1 hour
    });
    await newUser.save();
    generateToken(res, newUser._id);
    await sendVerifyEmail(email, code);
    res.status(201).json({
      message: "User Created Successfully",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup()", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Expired or incorrect verification code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.username, user.email);
    res.status(200).json({
      message: "Your email has been verified",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail()", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const reSendVerifyCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    await sendVerifyEmail(email, code);
    user.verificationToken = code;
    user.verificationTokenExpiresAt = Date.now() + 60 * 60 * 1000;
    await user.save();
    res.status(200).json({
      message: "Verification code has been sent successfully",
    });
  } catch (error) {
    console.log("Error in reSendVerifyCode()", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All inputs are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isCorrect = bcryptjs.compareSync(password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }
    generateToken(res, user._id);
    await sendWelcomeEmail(user.username, user.email);
    res.status(200).json({
      message: "Welcome back to our website",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in login()", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "We're sad to see you leave" });
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const token = crypto.randomBytes(24).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000;
    await user.save();
    await sendForgotPassword(
      email,
      `${process.env.CLIENT_URL}/reset-password/${token}`
    );
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.log("Error in forgotPassword()", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or Expired Reset Link" });
    }
    const newHashedPass = bcryptjs.hashSync(newPassword, 10);
    user.password = newHashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendResetSuccess(user.username, user.email);
    res.status(200).json({
      message: "Password Reset Successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in resetPassword()", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("Error in checkAuth()", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    await sendDeleteAccount(user.email, user.username);
    await User.deleteOne({ _id: userId });
    res.clearCookie("token").json({ message: "Account has been deleted" });
  } catch (error) {
    console.log("Error in deleteAccount()", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  signup,
  verifyEmail,
  reSendVerifyCode,
  login,
  logout,
  forgotPassword,
  resetPassword,
  checkAuth,
  deleteAccount,
};
