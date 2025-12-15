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
import {app, server} from "./config/socket";

// cors middleware
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

// json middleware
app.use(express.json({limit: "5mb"}));
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
    },
  })
);

// middlewares for google oauth2
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/auth", googleAuthRoute);
app.use("/api", userRoute);
app.use("/api/messages", messageRoute);

const PORT: number = Number(process.env.PORT);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/login-failed", (req, res) => {
  res.send("Login Failed brev");
});

app.get("/dashboard", (req, res) => {
  res.send("Logged in successfully!");
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
