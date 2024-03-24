import { User } from "../../src/types/User";
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

export const validUserFromModel = {
  id: 1,
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: bcrypt.hashSync('$3cr3t', SALT_ROUNDS)
}

export const secondValidUserFromModel = {
  id: 2,
  username: 'Thor',
  vocation: 'Guerreiro',
  level: 99,
  password: bcrypt.hashSync('$3cr3t', SALT_ROUNDS)
}

export const validUsersFromModel = [
  validUserFromModel,
  secondValidUserFromModel
];

export const validUserFromService = {
  username: 'Hagar',
  productIds: [1, 2]
}

export const secondValidUserFromService = {
  username: 'Thor',
  productIds: [2]
}

export const usersArray = [
  validUserFromModel,
  secondValidUserFromModel
];

export const usersFromService = [
  validUserFromService,
  secondValidUserFromService
];

export const getAllUsersSuccessfulResponse = {
  status: 'SUCCESS',
  data: usersFromService as User[]
}

export const userNotFoundServiceResponse = {
  status: 'NOT_FOUND', 
  data: { message: 'User not found' }
};