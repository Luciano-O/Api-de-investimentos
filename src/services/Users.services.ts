import { StatusCodes } from 'http-status-codes';
import { Transaction } from 'sequelize/types';
import Stocks from '../database/models/StocksModel';
import Users from '../database/models/UsersModel';
import IResponse from '../interfaces/Response.interface';
import IUser from '../interfaces/User.interfaces';
import HttpException from '../shared/http.exception';

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

const checkUser = async (userId: number, money: number, use: string): Promise<IResponse> => {
  const user = await Users.findByPk(userId, {
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

  if (money < 1) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: `Quantidade do ${use} não pode ser negativa ou igual a 0` },
    };
  }

  return {
    status: StatusCodes.OK,
    response: user,
  };
};

const deposit = async (userId: number, money: number, t?: Transaction): Promise<IResponse> => {
  const check = await checkUser(userId, money, 'deposito');
  if (check.status !== 200) return check;
  const user = check.response as IUser;

  await Users
    .update({ balance: user.balance + money }, { where: { id: userId }, transaction: t });

  return {
    status: StatusCodes.OK,
    response: {
      CodCliente: userId,
      Valor: money,
    },
  };
};

const withdrawal = async (userId: number, money: number, t?: Transaction): Promise<IResponse> => {
  const check = await checkUser(userId, money, 'saque');
  if (check.status !== 200) return check;
  const user = check.response as IUser;

  if (user.balance < money) {
    throw new HttpException(StatusCodes.BAD_REQUEST, 'Saldo insuficiente');
  }

  await Users
    .update({ balance: user.balance - money }, { where: { id: userId }, transaction: t });

  return {
    status: StatusCodes.OK,
    response: {
      CodCliente: userId,
      Valor: money,
    },
  };
};

export default {
  getById, deposit, withdrawal, checkUser,
};
