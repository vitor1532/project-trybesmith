import Joi from 'joi';

const createProductUnprocessableSchema = Joi.object({
  name: Joi.string().min(3),
  price: Joi.string().min(3),
  userId: Joi.number(),
});

export default createProductUnprocessableSchema;