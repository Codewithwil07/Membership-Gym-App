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
  // Ambil token dari cookie dulu, kalau gak ada baru dari header
  let token = req.cookies.token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan",
    });
  }

  try {
    const decoded = verifyToken(token); // verifyToken harusnya JWT.verify
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah expired",
    });
  }
}
