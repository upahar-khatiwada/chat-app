import express from "express";
import passport from "passport";
import { googleCallback, getMe, logout } from "../controllers/google_auth_controller";
import { protectRoute } from "../middlewares/protect_route_middleware";
import { baseUrl } from "../config/baseurl";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${baseUrl}/signin`,
  }),
  googleCallback
);

router.post("/logout", protectRoute, logout);

router.get("/me", protectRoute, getMe);

export default router;