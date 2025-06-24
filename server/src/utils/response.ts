import { Response } from "express";

export function successResponse(
  res: Response,
  status: number = 200,
  message: string = "OK",
  data: any = null,
) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}



export class AppError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
