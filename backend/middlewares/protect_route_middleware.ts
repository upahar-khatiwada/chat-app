import type { Request, Response, NextFunction } from "express";

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    // console.log(req.user);
    return next();
  }

  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
};