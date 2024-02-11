import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../utils/validateEnv";
import { statusCode } from "../types/types";

declare global {
  namespace Express {
    interface Request {
      email: string;
      password: string;
      userId?: string; // Change to string
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.cookie;


  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(statusCode.authError).json({
      message: "Invalid token",
    });
  }

  const token = authHeader?.split("=")[1];

  try {
    const decoded: JwtPayload = jwt.verify(token!, env.JWT_SECRET) as JwtPayload;

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(statusCode.authError).json({
      message: "Auth error",
    });
  }
};

export default authMiddleware;
