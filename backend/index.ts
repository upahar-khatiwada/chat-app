import express from "express";
import { type Request, type Response } from "express";
import { connectToMongoDB } from "./config/db";
import "./config/passport";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import googleAuthRoute from "./routes/google_auth_route";
import userRoute from "./routes/user_route";
import messageRoute from "./routes/message_route";
import { app, server } from "./config/socket";
import path from "path";

const __dirname = path.resolve();

console.log(process.env.NODE_ENV);

const allowedOrigins = [
  "http://localhost:4000",
  "https://chat-app-xkgk.onrender.com",
  "http://chat.upaharkhatiwada.com.np",
  "https://chat.upaharkhatiwada.com.np",
];

// cors middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// json middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// middlewares for google oauth2
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/auth", googleAuthRoute);
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);

const PORT: number = Number(process.env.PORT);

app.get("/login-failed", (req, res) => {
  res.send("Login Failed brev");
});

app.get("/dashboard", (req, res) => {
  res.send("Logged in successfully!");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/^\/.*$/, (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
