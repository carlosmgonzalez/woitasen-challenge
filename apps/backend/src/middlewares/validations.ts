import { type NextFunction, type Request, type Response } from "express";
import * as z from "zod";

export const validateBodySchema =
  <T>(schema: z.ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Datos inválidos",
          errors: z.prettifyError(error),
        });
      }
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

export const validateQuerySchema =
  <T>(schema: z.ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Datos inválidos",
          errors: z.prettifyError(error),
        });
      }
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

export const validateUUID = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    z.uuid().parse(req.params.id);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: z.prettifyError(error),
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
