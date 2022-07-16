import { StatusCodes } from 'http-status-codes';
import Stocks from '../database/models/StocksModel';
import Users from '../database/models/UsersModel';
import IResponse from '../interfaces/Response.interface';

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
    response: user,
  };
};

export default { getById };
