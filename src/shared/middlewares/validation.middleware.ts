import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import AppError from '../utils/AppError';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
            message: issue.message,
        }))
        throw new AppError(errorMessages[0].message, 400);
      }
    }
  };
}
