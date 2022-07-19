import IBuyedStock from './BuyedStock.interface';

interface IClientStocks extends IBuyedStock {
  stock: { price: number}
}

export default IClientStocks;
