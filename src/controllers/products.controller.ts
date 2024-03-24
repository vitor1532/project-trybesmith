import { Request, Response } from 'express';
import ProductsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const update = async (req: Request, res: Response): Promise<Response> => {
  const { status, data } = await ProductsService.update(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  update,
};