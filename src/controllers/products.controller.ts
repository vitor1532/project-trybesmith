import { NextFunction, Request, Response } from 'express';
import ProductsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { ControllerResponse } from '../types/ControllerResponse';

const getAll = async (_req: Request, res: Response, next: NextFunction): ControllerResponse => {
  try {
    const { status, data } = await ProductsService.getAll();

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction): ControllerResponse => {
  try {
    const { status, data } = await ProductsService.create(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction): ControllerResponse => {
  try {
    const { status, data } = await ProductsService.update(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  update,
  create,
};