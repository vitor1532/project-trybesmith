import { NextFunction, Request, Response } from 'express';
import { validateUpdateFields } from '../utils/validations/validateInputs';

const verifyUpdateFieldsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const error = validateUpdateFields(req.body);

  if (error) return res.status(422).json(error.data);

  next();
};

export default verifyUpdateFieldsMiddleware;