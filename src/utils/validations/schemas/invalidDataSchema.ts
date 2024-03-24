import Joi from 'joi';

const createProductInvalidDataSchema = Joi.object({
  name: Joi.required(),
  price: Joi.required(),
  userId: Joi.required(),
});

export default createProductInvalidDataSchema;