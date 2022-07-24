import IStock from './Stock.interface';

interface IFullStock extends IStock {
  buyedStocks: {quantity: number}
}

export default IFullStock;
