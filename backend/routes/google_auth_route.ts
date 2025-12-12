import express from "express";
import passport from "passport";
import {
  googleAuth,
  googleCallback,
  getMe,
} from "../controllers/google_auth_controller";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  googleAuth()
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:4000/signin",
  }),
  googleCallback()
);

router.get("/me", getMe);

export default router;