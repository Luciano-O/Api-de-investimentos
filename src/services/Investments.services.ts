import { StatusCodes } from 'http-status-codes';
import Stocks from '../database/models/StocksModel';
import seq from '../database/models';
import INewBuy from '../interfaces/NewBuy.interface';
import IStock from '../interfaces/Stock.interface';
import BuyedStocksServices from './BuyedStocks.services';
import IResponse from '../interfaces/Response.interface';
import UsersServices from './Users.services';

const validateCreate = (stockQtd: number, QtdeAtivo: number): IResponse => {
  if (QtdeAtivo > stockQtd) return { status: StatusCodes.BAD_REQUEST, response: { message: 'Quantidade da ação acima do limite' } };
  return { status: StatusCodes.OK };
};

const validateUpdate = (buyedQtd: number, buyQtd: number): IResponse => {
  if (buyedQtd < buyQtd) return { status: StatusCodes.BAD_REQUEST, response: { message: 'Quantidade da ação maior que a possuida' } };
  return { status: StatusCodes.OK };
};

const getById = async (stockId: number): Promise<IStock> => {
  const result: IStock | null = await Stocks.findByPk(stockId);
  if (result === null) throw new Error('Ação não exite');
  return result;
};

const getAllStocks = async (): Promise<IResponse> => {
  const response = await Stocks.findAll();

  return {
    status: StatusCodes.OK,
    response,
  };
};

const requestById = async (stockId: number): Promise<IResponse> => {
  const stock = await getById(stockId);

  return {
    status: StatusCodes.OK,
    response: {
      CodAtivo: stock.id,
      QtdeAtivo: stock.quantity,
      Valor: parseFloat(stock.price.toFixed(2)),
    },
  };
};

const create = async (newBuy: INewBuy): Promise<IResponse> => {
  const { CodAtivo, QtdeAtivo, CodCliente } = newBuy;
  const { quantity, price } = await getById(CodAtivo);

  if (validateCreate(quantity, QtdeAtivo)
    .status !== 200) return validateCreate(quantity, QtdeAtivo);

  const t = await seq.transaction();
  try {
    await Stocks.update(
      { quantity: quantity - QtdeAtivo },
      { where: { id: CodAtivo }, transaction: t },
    );

    await BuyedStocksServices.create(newBuy, t);

    await UsersServices.withdrawal(CodCliente, price * QtdeAtivo, t);

    await t.commit();

    return {
      status: StatusCodes.CREATED,
      response: {
        CodAtivo,
        CodCliente,
        QtdeAtivo,
      },
    };
  } catch (e) {
    await t.rollback();
    return {
      status: StatusCodes.BAD_GATEWAY,
      response: { message: 'Algo deu errado' },
    };
  }
};

const update = async (newBuy: INewBuy): Promise<IResponse> => {
  const { CodCliente, CodAtivo, QtdeAtivo } = newBuy;
  const buyedStock = await BuyedStocksServices.getByids(CodCliente, CodAtivo);
  const { quantity, price } = await getById(CodAtivo);

  if (!buyedStock) return { status: StatusCodes.BAD_REQUEST, response: { message: 'Voce não possui essa ação' } };
  if (validateUpdate(buyedStock.quantity, QtdeAtivo).status !== 200) {
    return validateUpdate(buyedStock.quantity, QtdeAtivo);
  }

  const t = await seq.transaction();
  try {
    await Stocks.update(
      { quantity: quantity + QtdeAtivo },
      { where: { id: CodAtivo }, transaction: t },
    );

    await BuyedStocksServices
      .updateQuantity(CodCliente, CodAtivo, buyedStock.quantity - QtdeAtivo, t);

    await UsersServices.deposit(CodCliente, price * QtdeAtivo, t);

    t.commit();

    return {
      status: StatusCodes.OK,
      response: newBuy,
    };
  } catch (e) {
    return {
      status: StatusCodes.BAD_GATEWAY,
      response: { message: 'Algo deu errado!' },
    };
  }
};

export default {
  create, update, requestById, validateCreate, validateUpdate, getById, getAllStocks,
};
