import { Request, Response } from 'express';
import ProductsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

// TODO: VERIFY REQ.BODY 

const create = async (req: Request, res: Response): Promise<Response> => {
  const { status, data } = await ProductsService.create(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

// TODO: VERIFY REQ.BODY (see 'extraindo contrato a partir dos types')

const update = async (req: Request, res: Response): Promise<Response> => {
  const { status, data } = await ProductsService.update(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  update,
  create,
};