import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret: Secret = process.env.JWT_SECRET || 'xsctp2123sda34';

const generateToken = (id: number, name: string, email: string): string => {
  const token = jwt
    .sign({ data: { id, email, name } }, secret, jwtConfig);

  return token;
};

export default generateToken;
