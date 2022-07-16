import { StatusCodes } from 'http-status-codes';
// import Sequelize from 'sequelize';
import BuyedStocks from '../database/models/BuyedStocks';
import Stocks from '../database/models/StocksModel';
// import seq from '../database/models';
import INewBuy from '../interfaces/NewBuy.interface';
import { IResponse } from '../interfaces/Response.interface';
import IStock from '../interfaces/Stock.interface';

const validateCreate = (stock: IStock | null, qtdeAtivo: number): IResponse => {
  if (!stock) return { status: StatusCodes.BAD_REQUEST, response: { message: 'A Ação não existe' } };
  if (qtdeAtivo > stock.quantity) return { status: StatusCodes.BAD_REQUEST, response: { message: 'Quantidade da Ação acima do limite' } };
  return { status: StatusCodes.OK, response: { message: 'ok' } };
};

const create = async (newBuy: INewBuy): Promise<IResponse> => {
  const { codAtivo, qtdeAtivo, codCliente } = newBuy;
  const result: IStock | null = await Stocks.findByPk(codAtivo);
  const insert = {
    userId: codCliente,
    stockId: codAtivo,
    quantity: qtdeAtivo,
  };
  // const t = new Sequelize.Transaction(seq, {});
  if (validateCreate(result, qtdeAtivo).status !== 200) return validateCreate(result, qtdeAtivo);

  try {
    await Stocks.update(
      { quantity: (result?.quantity || 100) - qtdeAtivo },
      { where: { id: codAtivo } },
    );

    await BuyedStocks
      .create(insert);

    return {
      status: StatusCodes.OK,
      response: { ...newBuy },
    };
  } catch (e) {
    console.log(e);
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: 'Algo deu errado' },
    };
  }
};

export default { create };
