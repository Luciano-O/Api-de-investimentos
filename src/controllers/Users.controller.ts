import { Request, Response } from 'express';
import BuyedStocksServices from '../services/BuyedStocks.services';
import UsersServices from '../services/Users.services';

const getById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const { status, response } = await UsersServices.getById(parseInt(id, 10));

  return res.status(status).json(response);
};

const deposit = async (req: Request, res: Response): Promise<Response> => {
  const { CodCliente, Valor } = req.body;

  const { status, response } = await UsersServices.deposit(CodCliente, Valor);

  return res.status(status).json(response);
};

const withdrawal = async (req: Request, res: Response): Promise<Response> => {
  const { CodCliente, Valor } = req.body;

  const { status, response } = await UsersServices.withdrawal(CodCliente, Valor);

  return res.status(status).json(response);
};

const getStocksByClient = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const { status, response } = await BuyedStocksServices.getStocksByClient(parseInt(id, 10));

  return res.status(status).json(response);
};

export default {
  getById, deposit, withdrawal, getStocksByClient,
};
