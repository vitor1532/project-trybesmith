import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/users.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { ControllerResponse } from '../types/ControllerResponse';

const getAll = async (_req: Request, res: Response, next: NextFunction): ControllerResponse => {
  try {
    const { status, data } = await UsersService.getAll();

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) { next(error); }
};

export default {
  getAll,
};