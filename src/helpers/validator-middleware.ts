import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";

const validatorMiddleware = async (
  schema: Joi.ObjectSchema,
  object: any,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validateAsync(object);
    next();
  } catch (error) {
    const { details } = error as ValidationError;
    const message = details.map((i) => i.message).join(",");

    res.status(400).json({ error: message });
  }
};

export const validatorBody = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) =>
    validatorMiddleware(schema, req.body, res, next);
};

export const validatorQuery = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) =>
   { 
    if (req.query.skills)
    req.query.skills = (req.query?.skills as string).split(",");
    return validatorMiddleware(schema, req.query, res, next);}
};
