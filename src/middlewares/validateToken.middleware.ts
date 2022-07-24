import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import IRequest from '../interfaces/request.interface';
import HttpException from '../shared/http.exception';

const secret = process.env.JWT_SECRET || 'pselXp';

const validateToken = (req: IRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  const [, auth] = token.split(' ');

  try {
    const decoded = jwt.verify(auth, secret) as jwt.JwtPayload;
    req.user = decoded.data.id;
  } catch (e) {
    throw new HttpException(401, 'Invalid token');
  } return next();
};

export default validateToken;
