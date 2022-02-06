const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../../index');

describe('Rota put /transfer/:cpf', () => {
  describe('Ao passar um valor negativo no campo "amount"', () => {
    let postTransfer;

    before(async () => {
      try {
        postTransfer = await chai
          .request(app)
          .put('/transfer/67836363463')
          .send({
            cpf: '35646423404',
            amount: -1000,
          });
      } catch (error) {
        error.message;
      }
    });

    it('retorna status 500', async () => {
      const { status } = postTransfer;

      expect(status).to.be.equals(500);
    });

    it('a "message" é igual a: "Não aceitamos valores negativos!"', () => {
      const {
        body: { message },
      } = postTransfer;

      expect(message).to.be.equal('Não aceitamos valores negativos!');
    });
  });

  describe('Ao passar um cpf que não tenho 11 caracteres na url da requisição', () => {
    let postTransfer;

    before(async () => {
      try {
        postTransfer = await chai.request(app).put('/transfer/6783').send({
          amount: 1000,
          cpf: '35646423404',
        });
      } catch (error) {
        error.message;
      }
    });

    it('retorna status 400', async () => {
      const { status } = postTransfer;

      expect(status).to.be.equals(400);
    });

    it('a "message" é igual a: O campo "cpf" deve conter 11 números', () => {
      const {
        body: { message },
      } = postTransfer;

      expect(message).to.be.equal('O campo "cpf" deve conter 11 números');
    });
  });

  describe('Ao tentar realizar uma transferência com um valor maior que oque o usuário possui em conta', () => {
    let postTransfer;

    before(async () => {
      try {
        postTransfer = await chai
          .request(app)
          .put('/transfer/67836363463')
          .send({
            cpf: '35646423404',
            amount: 1000,
          });
      } catch (error) {
        error.message;
      }
    });

    it('retorna status 500', async () => {
      const { status } = postTransfer;

      expect(status).to.be.equals(500);
    });

    it('a "message" é igual a: "Você não possui 1000 em sua conta bancária"', () => {
      const {
        body: { message },
      } = postTransfer;

      expect(message).to.be.equal('Você não possui 1000 em sua conta bancária');
    });
  });

  describe('Ao passar o body e params válidos', () => {
    let postTransfer;

    before(async () => {
      try {
        postTransfer = await chai
          .request(app)
          .put('/transfer/35646423404')
          .send({
            cpf: '67836363463',
            amount: 100,
          });
      } catch (error) {
        error.message;
      }
    });

    it('retorna status 200', async () => {
      const { status } = postTransfer;

      expect(status).to.be.equals(200);
    });

    it('retorna um campo "message" do tipo string', () => {
      const {
        body: { message },
      } = postTransfer;

      expect(message).to.be.an('string');
    });

    it('a "message" é igual a: "Transferência realizada com sucesso!"', () => {
      const {
        body: { message },
      } = postTransfer;

      expect(message).to.be.equal('Transferência realizada com sucesso!');
    });
  });
});
