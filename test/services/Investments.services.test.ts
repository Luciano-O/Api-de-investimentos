import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import sinon from 'sinon';

import Stocks from '../../src/database/models/StocksModel';
import Investments from '../../src/services/Investments.services'

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

describe('Requisita as informações com base no id do ativo', () => {
  const payloadId = 1;
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

  describe('Quando o ativo existe', () => {
    it('retorna o objeto esperado', async () => {
      const result = await Investments.getById(1)

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