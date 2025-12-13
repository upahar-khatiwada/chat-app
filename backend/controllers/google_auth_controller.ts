import { type Request, type Response, type NextFunction } from "express";

export const googleCallback = (req: Request, res: Response) => {
  res.redirect("http://localhost:4000/home");
};

export const getMe = (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((destroyErr) => {
      if (destroyErr) return next(destroyErr);

      res.clearCookie("connect.sid"); // cookie name
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};
