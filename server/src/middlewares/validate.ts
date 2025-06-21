import { ZodSchema } from "zod";

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
