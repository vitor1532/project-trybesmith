import UserModel from '../../database/models/user.model';
import { ServiceResponse } from '../../types/ServiceResponse';

const isUserValid = async (userId: number): Promise<ServiceResponse | undefined> => {
  const userFound = await UserModel.findByPk(userId);

  if (!userFound) return { status: 'NOT_FOUND', data: { message: 'user not found!' } };
};

export default {
  isUserValid,
};