import { StatusCodes } from 'http-status-codes';
import Stocks from '../database/models/StocksModel';
import seq from '../database/models';
import INewBuy from '../interfaces/NewBuy.interface';
import { IResponse } from '../interfaces/Response.interface';
import IStock from '../interfaces/Stock.interface';
import BuyedStocksServices from './BuyedStocks.services';

const validateCreate = (stockQtd: number, qtdeAtivo: number): IResponse => {
  if (qtdeAtivo > stockQtd) return { status: StatusCodes.BAD_REQUEST, response: { message: 'Quantidade da Ação acima do limite' } };
  return { status: StatusCodes.OK, response: { message: 'ok' } };
};

const getById = async (stockId: number): Promise<IStock> => {
  const result: IStock | null = await Stocks.findByPk(stockId);
  if (result === null) throw new Error('Ação não exite');
  return result;
};

const create = async (newBuy: INewBuy): Promise<IResponse> => {
  const { codAtivo, qtdeAtivo } = newBuy;
  const {
    price, quantity, name,
  } = await getById(codAtivo);

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
      status: StatusCodes.OK,
      response: { message: `Foi realizada a compra de ${qtdeAtivo} da ação ${name} resultando em um total de R$${qtdeAtivo * (price || 2)}` },
    };
  } catch (e) {
    await t.rollback();
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: 'Algo deu errado' },
    };
  }
};

export default { create };
