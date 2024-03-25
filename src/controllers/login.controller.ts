import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { ControllerResponse } from '../types/ControllerResponse';

const login = async (req: Request, res: Response, next: NextFunction): ControllerResponse => {
  try {
    const { status, data } = await LoginService.login(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

export default {
  login,
};