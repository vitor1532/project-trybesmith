import { Request, Response, NextFunction } from 'express';

const response400 = (res: Response, message: string) => res.status(400).json({ message });
const response422 = (res: Response, message: string) => res.status(422).json({ message });

const verifyNameField = (name: string, res: Response) => {
  if (!name) return response400(res, '"name" is required');
  if (name.length < 3) return response422(res, '"name" length must be at least 3 characters long');
};

const verifyPriceField = (price: string, res: Response) => {
  if (!price) return response400(res, '"price" is required');
  if (price.length < 3) {
    return response422(
      res, 
      '"price" length must be at least 3 characters long',
    );
  }
};

const verifyUserIdField = (userId: number, res: Response) => {
  if (!userId) return response400(res, '"userId" is required');
};

const verifyCreateProductFields = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, userId } = req.body;
  verifyNameField(name, res);
  if (typeof name !== 'string') return response422(res, '"name" must be a string');
  verifyPriceField(price, res);
  if (typeof price !== 'string') return response422(res, '"price" must be a string');
  verifyUserIdField(userId, res);
  if (typeof userId !== 'number') return response422(res, '"userId" must be a number');
  next();
};

export default verifyCreateProductFields;