import { Product } from './Product';
import { User } from './User';

export type ServiceResponseError = {
  message: string
};

export type ServiceResponseSuccess = Product | User;

export type ServiceResponse = {
  status: string,
  data: ServiceResponseError | ServiceResponseSuccess
};