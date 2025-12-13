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
