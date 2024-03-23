import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';

const findById = async (id: number): Promise<ServiceResponse> => {
  const userFound = await UserModel.findByPk(id);

  if (!userFound) return { status: 'NOT_FOUND', data: { message: 'user not found!' } };

  return ({ status: 'SUCCESS', data: userFound.dataValues });
};

export default {
  findById,
};