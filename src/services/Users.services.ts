import { StatusCodes } from 'http-status-codes';
import { Transaction } from 'sequelize/types';
import Stocks from '../database/models/StocksModel';
import Users from '../database/models/UsersModel';
import IResponse from '../interfaces/Response.interface';
import IUser from '../interfaces/User.interfaces';
import HttpException from '../shared/http.exception';
import generateToken from '../shared/generateToken';

const formatFullUser = (user: IUser): IUser => {
  const result = {
    id: user.id,
    name: user.name,
    email: user.email,
    balance: Number(user.balance.toFixed(2)),
    stocks: user.stocks?.map((stock) => ({
      id: stock.id,
      name: stock.name,
      price: Number(stock.price.toFixed(2)),
      quantity: stock.buyedStocks.quantity,
    })),
  };

  return result as IUser;
};

const getById = async (id: number): Promise<IResponse> => {
  const user = await Users.findByPk(id, {
    include: {
      model: Stocks,
      attributes: ['id', 'name', 'price'],
      through: { attributes: ['quantity'] },
    },
    attributes: ['id', 'name', 'balance', 'email'],
  });

  if (!user) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: 'Cliente não existe' },
    };
  }

  return {
    status: StatusCodes.OK,
    response: formatFullUser(user) as IUser,
  };
};

const checkUser = async (userId: number, money: number, use: string): Promise<IResponse> => {
  const user = await Users.findByPk(userId, {
    include: {
      model: Stocks,
      attributes: ['id', 'name', 'price'],
      through: { attributes: ['quantity'] },
    },
    attributes: ['id', 'email', 'name', 'balance'],
  });

  if (!user) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: 'Cliente não existe' },
    };
  }

  if (money <= 0) {
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

const login = async (email: string, password: string): Promise<IResponse> => {
  const user = await Users.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: {
        message: 'Wrong email or password',
      },
    };
  }

  if (password !== user.password) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: {
        message: 'Wrong email or password',
      },
    };
  }

  const token = generateToken(user.id, user.name, user.email);

  return {
    status: StatusCodes.OK,
    response: {
      token,
    },
  };
};

const register = async (user: IUser): Promise<IResponse> => {
  console.log(user);

  try {
    const createdUser = await Users.create({
      name: user.name,
      email: user.email,
      password: user.password,
      balance: user.balance,
    });

    const token = generateToken(createdUser.id, user.name, user.email);

    return {
      status: StatusCodes.OK,
      response: {
        token,
      },
    };
  } catch (e) {
    return {
      status: StatusCodes.BAD_REQUEST,
      response: { message: 'User already exists' },
    };
  }
};

export default {
  getById, deposit, withdrawal, checkUser, login, register,
};
