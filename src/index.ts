import db from './database/models';
import Stocks from './database/models/StocksModel';
import Users from './database/models/UsersModel';

const getAll = async () => {
  const result = await Users.findAll({
    include: [
      {model: Stocks}
    ]
  })
  return result
}
const response = getAll();
setTimeout(() => console.log(response), 3000)
