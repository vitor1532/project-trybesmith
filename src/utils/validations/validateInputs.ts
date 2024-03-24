import { ServiceResponse } from '../../types/ServiceResponse';
import createProductInvalidDataSchema from './schemas/invalidDataSchema';
import createProductUnprocessableSchema from './schemas/unprocessableSchema';

type CreateProduyctBody = { name: string, price: string, userId: number };

export const validateCreateInvalidDataProductFields = (
  body: CreateProduyctBody,
): ServiceResponse<string> | undefined => {
  const { error } = createProductInvalidDataSchema.validate(body);

  if (error) {
    return { status: 'INVALID_DATA', data: { message: error.details[0].message } };
  }
};

export const validateCreateUnprocessableProductFields = (
  body: CreateProduyctBody,
): ServiceResponse<string> | undefined => {
  const { error } = createProductUnprocessableSchema.validate(body);

  if (error) {
    return { status: 'UNPROCESSABLE', data: { message: error.details[0].message } };
  }
};

export default { validateCreateUnprocessableProductFields, validateCreateInvalidDataProductFields };