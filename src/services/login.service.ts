import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import jwtUtil from '../utils/jwtUtil';

type LoginInput = {
  username: string,
  password: string,
};

type Token = {
  token: string,
};

const login = async ({ username, password }: LoginInput): Promise<ServiceResponse<Token>> => {
  const user = await UserModel.findOne({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const token = jwtUtil.create({ id: user.dataValues.id });

  return { status: 'SUCCESS', data: { token } };
};

export default {
  login,
};