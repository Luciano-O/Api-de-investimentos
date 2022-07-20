import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import sinon from 'sinon';
import BuyedStocks from '../../src/database/models/BuyedStocks';

import Stocks from '../../src/database/models/StocksModel';
import BuyedStocksServices from '../../src/services/BuyedStocks.services';
import Investments from '../../src/services/Investments.services'

describe('Testa o service de Investments', () => {
  describe('Valida se a quantidade para compra esta disponivel no estoque', () => {
    describe('Quando é suficiente', () => {
      const payloadStock = 100;
      const payloadBuyStock = 20;

      it('Retorna o objeto correto', () => {
        const { status } = Investments.validateCreate(payloadStock, payloadBuyStock);
        
        expect(status).to.be.equal(StatusCodes.OK)
      })
    })

    describe('Quando não é suficiente', () => {
      const payloadStock = 30;
      const payloadBuyStock = 50;

      it('Retorna o objeto correto', () => {
        const { status, response } = Investments.validateCreate(payloadStock, payloadBuyStock);
        
        expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
        expect(response).to.be.a('object');
        expect(response).to.contain({ message: 'Quantidade da ação acima do limite'})
      })
    })
  })

  describe('Valida se o cliente possui a quantidade suficiente para a venda', () => {
    describe('Quando é suficiente', () => {
      const payloadBuyed = 100;
      const payloadBuyStock = 20;

      it('Retorna o objeto correto', () => {
        const { status } = Investments.validateUpdate(payloadBuyed, payloadBuyStock);
        
        expect(status).to.be.equal(StatusCodes.OK)
      })
    })

    describe('Quando não é suficiente', () => {
      const payloadBuyed = 30;
      const payloadBuyStock = 50;

      it('Retorna o objeto correto', () => {
        const { status, response } = Investments.validateUpdate(payloadBuyed, payloadBuyStock);
        
        expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
        expect(response).to.be.a('object');
        expect(response).to.contain({ message: 'Quantidade da ação maior que a possuida'})
      })
    })
  })

  describe('Retorna as informações com base no id do ativo', () => {
    const payloadId = 1
    describe('Quando o ativo existe', () => {
      before(async () => {
        const execute = {
          id: 1,
          name: "ABEV3",
          price: 14.57,
          quantity: 99
        }
    
        sinon.stub(Stocks, 'findByPk').resolves(execute as any)
      })
    
      after(async () => {
        sinon.restore();
      })

      it('retorna o objeto esperado', async () => {
        const result = await Investments.getById(payloadId)

        expect(result).to.be.a('object');
        expect(result).to.contain(
          {
            id: 1,
            name: "ABEV3",
            price: 14.57,
            quantity: 99
          }
        )
      })
    })
  })

  describe('Envia as informações do ativo', () => {
    const payloadId = 1 
    describe('Quando o ativo existe', () => {
      before(async () => {
        const execute = {
          id: 1,
          name: "ABEV3",
          price: 14.57,
          quantity: 99
        }
    
        sinon.stub(Stocks, 'findByPk').resolves(execute as any)
      })
    
      after(async () => {
        sinon.restore();
      })

      it('retorna o objeto esperado', async () => {
        const {status, response} = await Investments.requestById(payloadId)
        expect(status).to.be.equal(StatusCodes.OK);
        expect(response).to.be.a('object');
        expect(response).to.contain({
          CodAtivo: 1,
          Valor: 14.57,
          QtdeAtivo: 99
        })
      })
    })
  })

  describe('Realiza uma nova compra', () => {
    const payloadBuy = {
      codAtivo: 1,
      qtdeAtivo: 10,
      codCliente: 1
    }

    describe('Quando realiza a compra corretamente', () => {
      before(async () => {
        const execute = {
          id: 1,
          name: "ABEV3",
          price: 14.57,
          quantity: 99
        };

        sinon.stub(Stocks, 'findByPk').resolves(execute as any);
        sinon.stub(Stocks, 'update').resolves();
        sinon.stub(BuyedStocksServices, 'create').resolves();
      });

      after(async () => {
        sinon.restore();
      });

      it('Retorna o objeto correto', async () => {
        const { status, response } = await Investments.create(payloadBuy)

        expect(status).to.be.equal(StatusCodes.CREATED)
        expect(response).to.be.an('object');
        expect(response).to.contain(payloadBuy)
      })
    })
  })

  describe('Realiza uma venda', () => {
    const payloadSell = {
      codAtivo: 1,
      qtdeAtivo: 10,
      codCliente: 1
    }

    describe('Quando a venda é realizada corretamente', () => {
      before(async () => {
        const execute = {
          userId: 1,
          stockId: 1,
          quantity: 20
        }

        const execute2 = {
          id: 1,
          name: "ABEV3",
          price: 14.57,
          quantity: 99
        }

        sinon.stub(BuyedStocksServices, 'getByids').resolves(execute as any);
        sinon.stub(BuyedStocks, 'findOne').resolves(execute as any)
        sinon.stub(Stocks, 'findByPk').resolves(execute2 as any);
        sinon.stub(Stocks, 'update').resolves();
        sinon.stub(BuyedStocksServices, 'updateQuantity').resolves();
      })

      after(async () => {
        sinon.restore();
      })

      it('Retorna o objeto correto', async () => {
        const { status, response } = await Investments.update(payloadSell);

        expect(status).to.be.equal(StatusCodes.OK);
        expect(response).to.be.an('object');
        expect(response).to.contain(payloadSell)
      })
    })
  })
})