import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from './errorMiddleware';

export const validate =
  (schema: ZodSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = error as any;
        const message = zodError.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ');
        return next(new AppError(message, 400));
      }
      return next(error);
    }
  };
