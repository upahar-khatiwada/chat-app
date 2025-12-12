import express from "express";
import { type Request, type Response } from "express";
import { connectToMongoDB } from "./config/db";
import "./config/passport";
import passport from "passport";
import session from "express-session";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT: number = Number(process.env.PORT);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World</h1>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:4000/signin",
  }),
  (req, res) => {
    res.redirect("http://localhost:4000/home");
  }
);

app.get("/login-failed", (req, res) => {
  res.send("Login Failed brev");
});

app.get("/dashboard", (req, res) => {
  res.send("Logged in successfully!");
});

app.get("/auth/me", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    return res.json({ user: req.user });
  }
  res.status(401).json({ user: null });
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
