const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../../index');

describe('Rota get /user/:cpf', () => {
  describe('Ao passar um cpf que não tem 11 caracteres na url da requisição', () => {
    let postAccount;

    before(async () => {
      try {
        postAccount = await chai.request(app).get('/user/6783');
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

  describe('Ao passar um cpf válido e cadastrado no banco de dados', () => {
    let postAccount;
    before(async () => {
      postAccount = await chai.request(app).get('/user/67836363463');
    });
    it('retorna um status 200', () => {
      const { status } = postAccount;

      expect(status).to.be.equals(200);
    });

    it('retorna um objeto', () => {
      const { body } = postAccount;

      expect(body).to.be.an('object');
    });

    it('retorna a chave "id" e verifica se é um number', () => {
      const {
        body: { id },
      } = postAccount;

      expect(typeof id).to.be.equal('number');
    });

    it('retorna a chave "fullname" e verifica se é igual a "Lailson Gabriel Vieira Cavalcante" e uma string', () => {
      const {
        body: { fullName },
      } = postAccount;

      expect(typeof fullName).to.be.equal('string');
      expect(fullName).to.be.equal('Lailson Gabriel Vieira Cavalcante');
    });

    it('retorna a chave "cpf" e verifica se é uma string', () => {
      const {
        body: { cpf },
      } = postAccount;

      expect(typeof cpf).to.be.equal('string');
    });

    it('retorna a chave "bank" e verifica se é um number', () => {
      const {
        body: { bank },
      } = postAccount;

      expect(typeof bank).to.be.equal('number');
    });
  });
});
