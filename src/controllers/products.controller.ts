import { Request, Response } from 'express';
import ProductsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const getAll = async (_req: Request, res: Response): Promise<Response> => {
  const { status, data } = await ProductsService.getAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { status, data } = await ProductsService.create(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { status, data } = await ProductsService.update(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  getAll,
  update,
  create,
};