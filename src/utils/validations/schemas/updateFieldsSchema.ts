import Joi from 'joi';

const updateFieldsSchema = Joi.object({
  name: Joi.string().min(3),
  price: Joi.string().min(3),
});

export default updateFieldsSchema;