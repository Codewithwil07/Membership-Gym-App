import { Request, Response, NextFunction } from "express";

export function errorHandler() {
  return function (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error("💥 ErrorHandler caught:", err);

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    return res.status(status).json({
      success: false,
      message,
    });
  };
}
