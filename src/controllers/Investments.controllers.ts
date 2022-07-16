import { Request, Response } from 'express';
import INewBuy from '../interfaces/NewBuy.interface';
import InvestmentsServices from '../services/Investments.services';

const create = async (req: Request, res: Response) => {
  const newBuy: INewBuy = req.body;

  const { status, response } = await InvestmentsServices.create(newBuy);

  res.status(status).json(response);
};

export default { create };
