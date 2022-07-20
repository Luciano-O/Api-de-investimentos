import { StatusCodes } from 'http-status-codes';
import Stocks from '../database/models/StocksModel';
import seq from '../database/models';
import INewBuy from '../interfaces/NewBuy.interface';
import IStock from '../interfaces/Stock.interface';
import BuyedStocksServices from './BuyedStocks.services';
import IResponse from '../interfaces/Response.interface';

const validateCreate = (stockQtd: number, qtdeAtivo: number): IResponse => {
  if (qtdeAtivo > stockQtd) return { status: StatusCodes.BAD_REQUEST, response: { message: 'Quantidade da ação acima do limite' } };
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
  const { codAtivo, qtdeAtivo, codCliente } = newBuy;
  const { quantity } = await getById(codAtivo);

  if (validateCreate(quantity, qtdeAtivo)
    .status !== 200) return validateCreate(quantity, qtdeAtivo);

  const t = await seq.transaction();
  try {
    await Stocks.update(
      { quantity: quantity - qtdeAtivo },
      { where: { id: codAtivo }, transaction: t },
    );

    await BuyedStocksServices.create(newBuy, t);

    await t.commit();

    return {
      status: StatusCodes.CREATED,
      response: {
        codAtivo,
        codCliente,
        qtdeAtivo,
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
  const { codCliente, codAtivo, qtdeAtivo } = newBuy;
  const buyedStock = await BuyedStocksServices.getByids(codCliente, codAtivo);
  const { quantity } = await getById(codAtivo);

  if (!buyedStock) return { status: StatusCodes.BAD_REQUEST, response: { message: 'Voce não possui essa ação' } };
  if (validateUpdate(buyedStock.quantity, qtdeAtivo).status !== 200) {
    return validateUpdate(buyedStock.quantity, qtdeAtivo);
  }

  const t = await seq.transaction();
  try {
    await Stocks.update(
      { quantity: quantity + qtdeAtivo },
      { where: { id: codAtivo }, transaction: t },
    );

    await BuyedStocksServices
      .updateQuantity(codCliente, codAtivo, buyedStock.quantity - qtdeAtivo, t);

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
  create, update, requestById, validateCreate, validateUpdate, getById,
};
