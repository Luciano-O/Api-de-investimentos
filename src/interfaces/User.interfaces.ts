import IFullStock from './FullStock.interfaces';

interface IUser {
  id?: number
  name: string
  balance: number
  password?: string
  stocks?: IFullStock[]
}

export default IUser;
