import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const login = async (req: Request, res: Response): Promise<Response> => {
  const { status, data } = await LoginService.login(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  login,
};