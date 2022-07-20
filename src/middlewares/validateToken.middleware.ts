import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import IRequest from '../interfaces/request.interface';

const secret = process.env.JWT_SECRET || 'pselXp';

const validateToken = (req: IRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    req.user = decoded.data.id;
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  } return next();
};

export default validateToken;
