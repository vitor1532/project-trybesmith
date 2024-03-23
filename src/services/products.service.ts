import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const insert = async ({ id, name, price, userId }: Product): Promise<ServiceResponse> => {
  const productFound = await ProductModel.findByPk(id);
  if (!productFound) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await ProductModel.update({ name, price, userId }, { where: { id } });

  await productFound.reload();

  return { status: 'SUCCESS', data: productFound.dataValues };
};

export default {
  insert,
};