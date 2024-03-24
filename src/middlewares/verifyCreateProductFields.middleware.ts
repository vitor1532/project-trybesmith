import { Request, Response, NextFunction } from 'express';
import { 
  validateCreateInvalidDataProductFields,
  validateCreateUnprocessableProductFields,
} from '../utils/validations/validateInputs';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const verifyCreateProductFields = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const errorInvalidData = validateCreateInvalidDataProductFields(body);
  const errorUnprocessable = validateCreateUnprocessableProductFields(body);

  if (errorInvalidData) {
    return res.status(mapStatusHTTP(errorInvalidData.status)).json(errorInvalidData.data);
  }
  if (errorUnprocessable) {
    return res.status(mapStatusHTTP(errorUnprocessable.status)).json(errorUnprocessable.data);
  }
  if (typeof body.userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }
  next();
};

export default verifyCreateProductFields;