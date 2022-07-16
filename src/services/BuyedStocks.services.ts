import { Transaction } from 'sequelize/types';
import BuyedStocks from '../database/models/BuyedStocks';
import IBuyedStock from '../interfaces/BuyedStock.interface';
import INewBuy from '../interfaces/NewBuy.interface';

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

export default { create, getByids, updateQuantity };
