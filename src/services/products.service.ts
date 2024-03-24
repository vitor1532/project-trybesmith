import ProductModel from '../database/models/product.model';
import { ProductToUpdate } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const update = async ({ name, price }: ProductToUpdate): Promise<ServiceResponse> => {
  const productFound = await ProductModel.findOne({ where: { name } });
  if (!productFound) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await ProductModel.update({ name, price }, { where: { id: productFound.dataValues.id } });

  await productFound.reload();

  return { status: 'SUCCESS', data: productFound.dataValues };
};

export default {
  update,
};