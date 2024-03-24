import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const getAll = async (_req: Request, res: Response): Promise<Response> => {
  const { status, data } = await UsersService.getAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  getAll,
};