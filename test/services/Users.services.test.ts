import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import sinon from 'sinon';

import Users from '../../src/database/models/UsersModel';
import UsersServices from '../../src/services/Users.services';

const returnMock = {
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
}

const payloadId: number = 1;
describe('Retorna o cliente pelo id', () => {

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
    before(async () => {
      const execute = returnMock;

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


describe('Varifica se o usuario existe e se o deposito é válido', () => {
  describe('Quando o usuario existe e o deposito é válido', () => {
    before(async () => {
      const execute = returnMock;

      sinon.stub(Users, 'findByPk').resolves(execute as any)
    });

    after(async () => {
      sinon.restore()
    });

    it('Retorna o objeto correto', async () => {
      const { status, response } = await UsersServices.checkUser(payloadId, 50, 'deposit');

      expect(status).to.be.equal(StatusCodes.OK);
      expect(response).to.be.a('object');
      expect(response).to.contain({ id: 2, name: 'Adevani Nascimento' });
    })
  })

  describe('Quando o usuario não existe e o deposito é válido', () => {
    before(async () => {
      const execute = null;

      sinon.stub(Users, 'findByPk').resolves(execute as any)
    });

    after(async () => {
      sinon.restore()
    });

    it('Retorna o objeto correto', async () => {
      const { status, response } = await UsersServices.checkUser(payloadId, 50, 'deposit');

      expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response).to.be.a('object');
      expect(response).to.contain({ message: 'Cliente não existe' });
    })
  })

  describe('Quando o usuario existe e o deposito é válido', () => {
    before(async () => {
      const execute = returnMock;

      sinon.stub(Users, 'findByPk').resolves(execute as any)
    });

    after(async () => {
      sinon.restore()
    });

    it('Retorna o objeto correto', async () => {
      const { status, response } = await UsersServices.checkUser(payloadId, 0, 'deposito');

      expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response).to.be.a('object');
      expect(response).to.contain({message : 'Quantidade do deposito não pode ser negativa ou igual a 0'});
    })
  })
})

describe('Realização do deposito', () => {
  before(async () => {
    sinon.stub(Users, 'update').resolves();
  })

  after(async () => {
    sinon.restore();
  })

  describe('Realiza o deposito com sucesso', () => {
    before(async () => {
      const execute = returnMock

      sinon.stub(Users, 'findByPk').resolves(execute as any)
    })

    after(async () => {
      sinon.restore();
    })

    it('Retorna o objeto correto', async () => {
      const { status, response } = await UsersServices.deposit(payloadId, 50);

      expect(status).to.be.equal(StatusCodes.OK);
      expect(response).to.be.an('object');
      expect(response).to.contain({
        id: payloadId,
        name: returnMock.name,
        newBalance: returnMock.balance + 50
      })
    })
  })
})

describe('Realização a retirada', () => {
  before(async () => {
    sinon.stub(Users, 'update').resolves();
  })

  after(async () => {
    sinon.restore();
  })

  describe('Realiza a retirada com sucesso', () => {
    before(async () => {
      const execute = returnMock

      sinon.stub(Users, 'findByPk').resolves(execute as any)
    })

    after(async () => {
      sinon.restore();
    })

    it('Retorna o objeto correto', async () => {
      const { status, response } = await UsersServices.withdrawal(payloadId, 50);

      expect(status).to.be.equal(StatusCodes.OK);
      expect(response).to.be.an('object');
      expect(response).to.contain({
        id: payloadId,
        name: returnMock.name,
        newBalance: returnMock.balance - 50
      })
    })
  })

  describe('Cliente não tem o valor necessario', () => {
    before(async () => {
      const execute = returnMock

      sinon.stub(Users, 'findByPk').resolves(execute as any)
    })

    after(async () => {
      sinon.restore();
    })

    it('Retorna o objeto correto', async () => {
      const { status, response } = await UsersServices.withdrawal(payloadId, 5000);

      expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(response).to.be.an('object');
      expect(response).to.contain({message: 'Saldo insuficiente'})
    })
  })
})