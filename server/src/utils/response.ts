import { Response } from "express";

export function successResponse(
  res: Response,
  data: any = null,
  message: string = "OK",
  status: number = 200
) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}
