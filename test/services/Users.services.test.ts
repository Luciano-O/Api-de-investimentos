import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import sinon from 'sinon';

import Users from '../../src/database/models/UsersModel';
import UsersServices from '../../src/services/Users.services';

describe('Retorna o cliente pelo id', () => {
  const payloadId: number = 1;

  describe('Quando o cliente nao existe', () => {
    before(async () => {
      const execute = null;

      sinon.stub(Users, 'findByPk').resolves(execute);
    });

    after(async () => {
      sinon.restore();
    });

    it('retorna o response correto', async () => {
      const { status, response } = await UsersServices.getById(payloadId);

      expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response).to.include({ message: 'Cliente não existe' });
    });
  });

  describe('Quando o cliente exite', () => {
    const payloadId = 1;

    before(async () => {
      const execute = {
        id: 2,
        name: 'Adevani Nascimento',
        balance: 1550.3,
        stocks: [
          {
            id: 1,
            name: 'ABEV3',
            price: 14.57,
            buyedStocks: {
              quantity: 5,
            },
          },
        ],
      };

      sinon.stub(Users, 'findByPk').resolves(execute as any);
    });

    after(async () => {
      sinon.restore();
    });

    it('Retorna o objeto correto', async () => {
      const { status, response } = await UsersServices.getById(payloadId);

      expect(status).to.be.equal(StatusCodes.OK);
      expect(response).to.be.a('object');
      expect(response).to.contain({ id: 2, name: 'Adevani Nascimento' });
    });
  });
});
