const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../../index');

describe('Rota put/user/:cpf', () => {
  describe('Ao passar um valor negativo no campo "amount"', () => {
    let postAccount;

    before(async () => {
      try {
        postAccount = await chai.request(app).put('/user/67836363463').send({
          amount: -1000,
        });
      } catch (error) {
        error.message;
      }
    });

    it('retorna status 500', async () => {
      const { status } = postAccount;

      expect(status).to.be.equals(500);
    });

    it('retorna um atributo "message", que é string', async () => {
      const {
        body: { message },
      } = postAccount;

      expect(typeof message).to.be.equals('string');
    });

    it('a "message" é igual a: "Não aceitamos valores negativos!"', () => {
      const {
        body: { message },
      } = postAccount;

      expect(message).to.be.equal('Não aceitamos valores negativos!');
    });
  });

  describe('Ao passar um cpf que não tenho 11 caracteres na url da requisição', () => {
    let postAccount;

    before(async () => {
      try {
        postAccount = await chai.request(app).put('/user/6783').send({
          amount: 1000,
        });
      } catch (error) {
        error.message;
      }
    });

    it('retorna status 400', async () => {
      const { status } = postAccount;

      expect(status).to.be.equals(400);
    });

    it('retorna um atributo "message", que é string', async () => {
      const {
        body: { message },
      } = postAccount;

      expect(typeof message).to.be.equals('string');
    });

    it('a "message" é igual a: O campo "cpf" deve conter 11 números', () => {
      const {
        body: { message },
      } = postAccount;

      expect(message).to.be.equal('O campo "cpf" deve conter 11 números');
    });
  });

  describe('Ao depositar um valor maior que R$2,000', () => {
    let postAccount;

    before(async () => {
      try {
        postAccount = await chai.request(app).put('/user/67836363463').send({
          amount: 5000,
        });
      } catch (error) {
        error.message;
      }
    });

    it('retorna status 400', async () => {
      const { status } = postAccount;

      expect(status).to.be.equals(400);
    });

    it('retorna um atributo "message", que é string', async () => {
      const {
        body: { message },
      } = postAccount;

      expect(typeof message).to.be.equals('string');
    });

    it('a "message" é igual a: Por questão de segurança seus depósitos não podem ser maior do que R$2.000;', () => {
      const {
        body: { message },
      } = postAccount;

      expect(message).to.be.equal(
        'Por questão de segurança seus depósitos não podem ser maior do que R$2.000;',
      );
    });
  });

  describe('Ao passar os dados do body e do params válidos', () => {
    let postAccount;

    before(async () => {
      try {
        postAccount = await chai.request(app).put('/user/67836363463').send({
          amount: 1000,
        });
      } catch (error) {
        error.message;
      }
    });

    it('retorna status 400', async () => {
      const { status } = postAccount;

      expect(status).to.be.equals(204);
    });
  });
});
