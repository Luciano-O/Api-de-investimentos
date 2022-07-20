import { Request } from 'express';

interface IRequest extends Request {
  user ?: number
}

export default IRequest;
