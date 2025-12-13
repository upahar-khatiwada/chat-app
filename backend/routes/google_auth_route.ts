import express from "express";
import passport from "passport";
import { googleCallback, getMe } from "../controllers/google_auth_controller";
import { protectRoute } from "../middlewares/protect_route_middleware";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:4000/signin",
  }),
  googleCallback
);

router.get("/me", protectRoute, getMe);

export default router;