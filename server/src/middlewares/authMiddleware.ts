import { ZodSchema } from "zod";
import { verifyToken } from "../utils/jwtUtils";
import { NextFunction, Request, Response } from "express";

export const Validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      next({
        status: 400,
        message: err.errors?.[0]?.message || "Data tidak valid",
      });
    }
  };



export function protectRoute(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan atau format salah",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // Inject user info ke req
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah expired",
    });
  }
}
