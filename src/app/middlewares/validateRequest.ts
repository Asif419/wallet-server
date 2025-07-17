import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodRawShape } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: {
  body?: ZodObject<ZodRawShape>;
  query?: ZodObject<ZodRawShape>;
  params?: ZodObject<ZodRawShape>;
}) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (schema.body) {
      await schema.body.parseAsync(req.body);
    }
    if (schema.query) {
      await schema.query.parseAsync(req.query);
    }
    if (schema.params) {
      await schema.params.parseAsync(req.params);
    }

    next();
  });
};

export default validateRequest;