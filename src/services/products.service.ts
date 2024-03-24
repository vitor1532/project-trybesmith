import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { ProductToUpdate } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const create = async ({ 
  name, 
  price, 
  userId }: ProductInputtableTypes): Promise<ServiceResponse> => {
  const foundUser = await UserModel.findByPk(userId);
  if (!foundUser) return { status: 'NOT_FOUND', data: { message: 'User not found' } };

  const newProduct = await ProductModel.create({ name, price, userId });

  return { status: 'CREATED', data: newProduct.dataValues };
};

const update = async ({ name, price }: ProductToUpdate): Promise<ServiceResponse> => {
  const productFound = await ProductModel.findOne({ where: { name } });
  if (!productFound) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await ProductModel.update({ name, price }, { where: { id: productFound.dataValues.id } });

  await productFound.reload();

  return { status: 'SUCCESS', data: productFound.dataValues };
};

export default {
  update,
  create,
};