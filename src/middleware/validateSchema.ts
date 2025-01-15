import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Valida el cuerpo de la solicitud
      next(); // Si es válido, pasa al siguiente middleware
    } catch (error) {
      if (error instanceof Error && "errors" in error) {
        // Manejo de errores de Zod
        res.status(400).json({ errors: (error as any).errors });
        return 
      }
      res.status(500).json({ message: "Server error", error });
    }
  };