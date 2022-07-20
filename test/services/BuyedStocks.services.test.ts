import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import sinon from 'sinon';
import BuyedStocks from '../../src/database/models/BuyedStocks';

import BuyedStocksServices from '../../src/services/BuyedStocks.services';

const payloadId = 1

describe('Testa o service de BuyedStocks', () => {
  const executeBuyedStocks = {
    userId: 1,
    stockId: 1,
    quantity: 20
  }
  const payloadBuyedStocks = [
    {
      userId: 1,
      stockId: 1,
      quantity: 20,
      stock: {
        price: 15.5
      },
    },
    {
      userId: 1,
      stockId: 2,
      quantity: 50,
      stock: {
        price: 15.5
      },
    }
  ]
  
  describe('Retorna a ação possuida pelo usuario', () => {
    describe('Quando o cliente possui a ação', () => {
      before(async () => {
        sinon.stub(BuyedStocks, 'findOne').resolves(executeBuyedStocks as any)
      })
      
      after(async () => {
        sinon.restore();
      })

      it('Retorna o objeto correto', async () => {
        const result = await BuyedStocksServices.getByids(payloadId, payloadId)

        expect(result).to.be.an('object');
        expect(result).to.contain(executeBuyedStocks)
      })
    })

    describe('Quando o cliente não possui a ação', () => {
      before(async () => {
        sinon.stub(BuyedStocks, 'findOne').resolves(null)
      })

      after(async () => {
        sinon.restore();
      })

      it('Retorna nulo', async () => {
        const result = await BuyedStocksServices.getByids(payloadId, payloadId)

        expect(result).to.be.equal(null);
      })
    })
  })

  describe('Formata a saida de getStocksByClient', () => {

    it('retorna o objeto corretamente', () => {
      const result = BuyedStocksServices.formatStocks(payloadBuyedStocks);

      expect(result[0]).to.be.contain(
        {
          CodCliente: 1,
          CodAtivo: 1,
          QtdeAtivo: 20,
          Valor: 15.5
        },
      )
      expect(result[1]).to.contain(
        {
          CodCliente: 1,
          CodAtivo: 2,
          QtdeAtivo: 50,
          Valor: 15.5
        })
    })
  })

  describe('Retorna todas as ações que o cliente possui', () => {
    describe('Retorna os ativos corretamente', () => {
      before(async () => {
        sinon.stub(BuyedStocks, 'findAll').resolves(payloadBuyedStocks as any)
      })

      after(async () => {
        sinon.restore();
      })

      it('retorna o objeto correto', async () => {
        const { status, response } = await BuyedStocksServices.getStocksByClient(payloadId);

        expect(status).to.be.equal(StatusCodes.OK);
        expect(response).to.be.an('array');
      })
    })

    describe('Cliente não existe ou não possui ativos', () => {
      before(async () => {
        sinon.stub(BuyedStocks, 'findAll').resolves()
      })

      after(async () => {
        sinon.restore();
      })

      it('Retorna o objeto correto', async () => {
        const { response, status } = await BuyedStocksServices.getStocksByClient(payloadId);

        expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
        expect(response).to.be.an('object');
        expect(response).to.contain({message: 'O cliente não existe ou não possui ativos'})
      })
    })
  })
})