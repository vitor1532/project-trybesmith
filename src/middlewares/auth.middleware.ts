import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../utils/jwtUtil';
import UserModel from '../database/models/user.model';

const invalidToken = (res: Response) => res.status(401).json({ message: 'Invalid token' });

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split(' ')[1];

  try {
    const decoded = jwtUtil.verify(token);
    if (!decoded) return invalidToken(res);
    const user = await UserModel.findByPk(decoded.id);

    if (!user) return invalidToken(res);
    next();
  } catch (e) {
    return invalidToken(res);
  }
};

export default auth;