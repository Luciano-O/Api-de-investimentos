import { StatusCodes } from 'http-status-codes';
import { Transaction } from 'sequelize/types';
import BuyedStocks from '../database/models/BuyedStocks';
import Stocks from '../database/models/StocksModel';
import IBuyedStock from '../interfaces/BuyedStock.interface';
import IClientStocks from '../interfaces/ClientStocks.interface';
import INewBuy from '../interfaces/NewBuy.interface';
import IResponse from '../interfaces/Response.interface';
import IReturnClientStocks from '../interfaces/ReturnClientStocks.interfaces';

const getByids = async (userId: number, stockId: number): Promise<IBuyedStock | null> => {
  const buyedStock: IBuyedStock | null = await BuyedStocks.findOne({
    where: {
      userId,
      stockId,
    },
  });

  return buyedStock;
};

const remove = async (userId: number, stockId: number): Promise<void> => {
  await BuyedStocks.destroy({ where: { userId, stockId } });
};

const updateQuantity = async (
  userId: number,
  stockId: number,
  qtd: number,
  t?: Transaction | null,
): Promise<void> => {
  if (qtd === 0) {
    await remove(userId, stockId);
    return;
  }

  await BuyedStocks.update({ quantity: qtd }, { where: { userId, stockId }, transaction: t });
};

const create = async (insert: INewBuy, t?: Transaction): Promise<void> => {
  const { codAtivo, codCliente, qtdeAtivo } = insert;
  const buyedStock = await getByids(codCliente, codAtivo);
  if (buyedStock) {
    await updateQuantity(codCliente, codAtivo, buyedStock.quantity + qtdeAtivo, t);
    return;
  }
  await BuyedStocks
    .create({ userId: codCliente, stockId: codAtivo, quantity: qtdeAtivo }, { transaction: t });
};

const formatStocks = (stocks: IClientStocks[]): IReturnClientStocks[] => {
  const result = stocks.map((item) => ({
    CodCliente: item.userId,
    CodAtivo: item.stockId,
    QtdeAtivo: item.quantity,
    Valor: parseFloat(item.stock.price.toFixed(2)),
  }));

  return result;
};

const getStocksByClient = async (userId: number): Promise<IResponse> => {
  const stocks = await BuyedStocks.findAll({
    include: {
      model: Stocks,
      attributes: ['price'],
    },
    where: { userId },
  });

  if (!stocks) throw new Error('Ativo não existe ou usuario não o possui');

  const finalStocks = formatStocks(stocks as any);

  return {
    status: StatusCodes.OK,
    response: finalStocks,
  };
};

export default {
  create, getByids, updateQuantity, getStocksByClient,
};
