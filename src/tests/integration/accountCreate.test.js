const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../../index');

const consoleLogStub = stub(console, 'log');
before(() => consoleLogStub.returns(true));
after(() => consoleLogStub.restore());

describe('Rota post/user', () => {
  describe('quando os dados do `body` são válidos', () => {
    let postAccount;

    before(async () => {
      try {
        postAccount = await chai.request(app).post('/user').send({
          fullName: 'Thiago Siqueira Santos',
          cpf: '27936862493',
        });
      } catch (error) {
        error.message;
      }
    });

    it('retorna 201 - Created', async () => {
      const { status } = postAccount;

      expect(status).to.be.equals(201);
    });

    it('retorna um atributo "message", que é string', async () => {
      const {
        body: { message },
      } = postAccount;

      expect(typeof message).to.be.equals('string');
    });

    it('a "message" é igual a: "Sua conta bancária foi criada com Sucesso!"', () => {
      const {
        body: { message },
      } = postAccount;

      expect(message).to.be.equal('Sua conta bancária foi criada com Sucesso!');
    });
  });

  describe('Quando o algum dos campos do body é inválido', () => {
    let postAccount;

    before(async () => {
      try {
        postAccount = await chai.request(app).post('/user').send({
          fullName: 'Thiago Siqueira Santos',
        });
      } catch (error) {
        error.message;
      }
    });

    it('retorna um error code 400', () => {
      const { status } = postAccount;

      expect(status).to.be.equals(400);
    });

    it('retorna um atributo "message", que é string', async () => {
      const {
        body: { message },
      } = postAccount;

      expect(typeof message).to.be.equals('string');
    });

    it('a "message" é igual a: "Os campos "CPF" e "fullName" devem ser preenchidos"', () => {
      const {
        body: { message },
      } = postAccount;

      expect(message).to.be.equal(
        'Os campos "CPF" e "fullName" devem ser preenchidos',
      );
    });
  });

  describe('Se tentar criar uma conta com um cpf já existente', () => {
    before(async () => {
      try {
        postAccount = await chai.request(app).post('/user').send({
          fullName: 'Thiago Siqueira Santos',
          cpf: '27936862493',
        });
      } catch (error) {
        error.message;
      }
    });

    it('retornar error 500', () => {
      const { status } = postAccount;

      expect(status).to.be.equals(500);
    });

    it('retorna um atributo "message", que é string', async () => {
      const {
        body: { message },
      } = postAccount;

      expect(typeof message).to.be.equals('string');
    });

    it('a "message" é igual a: "O CPF: 279.368.624-93 já está viniculado a uma outra conta"', () => {
      const {
        body: { message },
      } = postAccount;

      expect(message).to.be.equal(
        'O CPF: 279.368.624-93 já está viniculado a uma outra conta',
      );
    });
  });
});
