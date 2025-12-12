import { type Request, type Response, type NextFunction } from "express";

export const googleAuth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
};

export const googleCallback = () => {
  return (req: Request, res: Response) => {
    res.redirect("http://localhost:4000/home");
  };
};

export const getMe = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    return res.json({ user: req.user });
  }
  res.status(401).json({ user: null });
};