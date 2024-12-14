import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config();

const router = express.Router();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/passport/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          isVerified: true,
        });
        await newUser.save();
        done(null, newUser);
      } else {
        done(null, user);
      }
    }
  )
);

//passport auth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL); // Redirect to frontend
  }
);
router.get("/auth/google/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});
router.get("/auth/google/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Logged out" });
  });
});

export default router;
