import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { User } from '../types/User';
import mapProductIds from '../utils/mapProductIds';

const findById = async (id: number): Promise<ServiceResponse<User>> => {
  const userFound = await UserModel.findByPk(id);

  if (!userFound) return { status: 'NOT_FOUND', data: { message: 'user not found!' } };

  return ({ status: 'SUCCESS', data: userFound.dataValues });
};

const getAll = async (): Promise<ServiceResponse<User[]>> => {
  const allUsers = await UserModel.findAll({
    attributes: ['username'],
    include: [{ 
      model: ProductModel, 
      as: 'productIds', 
      attributes: ['id'],
    }],
  });

  const usersData = mapProductIds(allUsers);

  return { status: 'SUCCESS', data: usersData };
};

export default {
  findById,
  getAll,
};