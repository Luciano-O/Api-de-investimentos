import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret: Secret = process.env.JWT_SECRET || 'pselXp';

const generateToken = (req: Request, res: Response) => {
  const { CodCliente, Name } = req.body;

  const token = jwt.sign({ data: { CodCliente, Name } }, secret, jwtConfig);

  res.status(StatusCodes.CREATED).json({ token });
};

export default generateToken;
