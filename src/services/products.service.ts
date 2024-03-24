import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import validations from './utils/validations';

const update = async ({ id, name, price, userId }: Product): Promise<ServiceResponse> => {
  const productFound = await ProductModel.findOne({ where: { name } });
  if (!productFound) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  if (productFound.dataValues.userId !== userId) await validations.isUserValid(userId);

  await ProductModel.update({ name, price, userId }, { where: { id } });

  await productFound.reload();

  return { status: 'SUCCESS', data: productFound.dataValues };
};

export default {
  update,
};