import db from './database/models';

const getAll = async () => {
  const result = await db.Users.findAll({
    include: [
      {model: Stocks, as: 'stocks'}
    ]
  })
  return result
}
const response = getAll();
setTimeout(() => console.log(response), 3000)
