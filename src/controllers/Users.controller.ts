import { Request, Response } from 'express';
import BuyedStocksServices from '../services/BuyedStocks.services';
import UsersServices from '../services/Users.services';
import IRequest from '../interfaces/request.interface';

const getById = async (req: IRequest, res: Response): Promise<Response> => {
  const id = req.user || 1;

  const { status, response } = await UsersServices.getById(id);

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

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const { status, response } = await UsersServices.login(email, password);

  return res.status(status).json(response);
};

const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, name } = req.body;
  const balance = 0;

  const { status, response } = await UsersServices.register({
    email, password, name, balance,
  });

  return res.status(status).json(response);
};

export default {
  getById, deposit, withdrawal, getStocksByClient, login, register,
};
