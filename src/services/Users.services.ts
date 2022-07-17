import { StatusCodes } from 'http-status-codes';
import Stocks from '../database/models/StocksModel';
import Users from '../database/models/UsersModel';
import IResponse from '../interfaces/Response.interface';
import IUser from '../interfaces/User.interfaces';

const getById = async (id: number): Promise<IResponse> => {
  const user = await Users.findByPk(id, {
    include: {
      model: Stocks,
      attributes: ['id', 'name', 'price'],
      through: { attributes: ['quantity'] },
    },
    attributes: ['id', 'name', 'balance'],
  });

  if (!user) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: 'Cliente não existe' },
    };
  }

  return {
    status: StatusCodes.OK,
    response: user as IUser,
  };
};

const deposit = async (userId: number, money: number): Promise<IResponse> => {
  const user = await Users.findByPk(userId);

  if (!user) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: 'Cliente não existe' },
    };
  }

  if (money < 1) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: 'Quantidade do deposito não pode ser negativa ou igual a 0' },
    };
  }

  await Users
    .update({ balance: user.balance + money }, { where: { id: userId } });

  return {
    status: StatusCodes.OK,
    response: {
      id: userId,
      name: user.name,
      newBalance: user.balance + money,
    },
  };
};

export default { getById, deposit };
