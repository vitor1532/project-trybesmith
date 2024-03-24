import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Product, ProductToUpdate } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const getAll = async (): Promise<ServiceResponse<Product[]>> => {
  const allProducts = await ProductModel.findAll();

  const productsData: Product[] = allProducts.map((product) => product.get({ plain: true }));

  return { status: 'SUCCESS', data: productsData };
};

const create = async ({ 
  name, 
  price, 
  userId }: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  const foundUser = await UserModel.findByPk(userId);
  if (!foundUser) return { status: 'UNPROCESSABLE', data: { message: '"userId" not found' } };

  const newProduct = await ProductModel.create({ name, price, userId });

  return { status: 'CREATED', data: newProduct.dataValues };
};

const update = async ({ name, price }: ProductToUpdate): Promise<ServiceResponse<Product>> => {
  const productFound = await ProductModel.findOne({ where: { name } });
  if (!productFound) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await ProductModel.update({ name, price }, { where: { id: productFound.dataValues.id } });

  await productFound.reload();

  return { status: 'SUCCESS', data: productFound.dataValues };
};

export default {
  getAll,
  update,
  create,
};