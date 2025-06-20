import { Request, Response, NextFunction } from "express";

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  
  if (!user || user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Hanya admin yang boleh mengakses",
    });
  }

  next();
}


export function superadminOnly(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user || !user.is_superadmin) {
    return res.status(403).json({
      success: false,
      message: "Hanya superadmin yang boleh mengakses",
    });
  }

  next();
}
