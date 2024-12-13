import { client, sender } from "./brevo.config.js";
import {
  DELETE_ACCOUNT,
  FORGOT_PASSWORD,
  SUCCESS_RESET_PASSWORD,
  VERIFICATION_EMAIL,
  VERIFICATION_EMAIL_SUCCESS,
} from "./templates.js";

const sendVerifyEmail = async (email, code) => {
  const sendSmtpEmail = {
    sender,
    to: [{ email }],
    subject: "Verify Your Account",
    htmlContent: VERIFICATION_EMAIL.replace("{code}", code),
  };
  try {
    await client.sendTransacEmail(sendSmtpEmail);
    console.log("Verify Email sent successfully");
  } catch (error) {
    console.log("Error in sendVerifyEmail", error.body);
  }
};

const sendWelcomeEmail = async (username, email) => {
  const sendSmtpEmail = {
    sender,
    to: [{ email }],
    subject: "Verify Your Account",
    htmlContent: VERIFICATION_EMAIL_SUCCESS.replace("{username}", username),
  };
  try {
    await client.sendTransacEmail(sendSmtpEmail);
    console.log("Welcome Email sent successfully");
  } catch (error) {
    console.log("Error in sendWelcomeEmail", error.body);
  }
};

const sendForgotPassword = async (email, url) => {
  const sendSmtpEmail = {
    sender,
    to: [{ email }],
    subject: "Reset Your Password",
    htmlContent: FORGOT_PASSWORD.replace("{resetLink}", url),
  };
  try {
    await client.sendTransacEmail(sendSmtpEmail);
    console.log("forgot password  sent successfully", url);
  } catch (error) {
    console.log("Error in sendForgotPassword", error.body);
  }
};

const sendResetSuccess = async (username, email) => {
  const sendSmtpEmail = {
    sender,
    to: [{ email }],
    subject: "Your Password has been reset",
    htmlContent: SUCCESS_RESET_PASSWORD.replace("{username}", username),
  };
  try {
    await client.sendTransacEmail(sendSmtpEmail);
    console.log("success reset password  sent successfully");
  } catch (error) {
    console.log("Error in sendResetSuccess", error.body);
  }
};

const sendDeleteAccount = async (email, username) => {
  const sendSmtpEmail = {
    sender,
    to: [{ email }],
    subject: "Delete Account Successfully",
    htmlContent: DELETE_ACCOUNT.replace("{username}", username),
  };
  try {
    await client.sendTransacEmail(sendSmtpEmail);
    console.log("delete account sent successfully");
  } catch (error) {
    console.log("Error in sendDeleteAccount", error.body);
  }
};
export {
  sendVerifyEmail,
  sendWelcomeEmail,
  sendForgotPassword,
  sendResetSuccess,
  sendDeleteAccount,
};
