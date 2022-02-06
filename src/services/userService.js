const formatCPF = require('../utils/cpfFormater');
const { User } = require('../models');

const createAccount = async (body) => {
  const { fullName } = body;

  const cpf = formatCPF(body.cpf);

  const verifyIfExist = await User.findOne({ where: { cpf } });

  if (verifyIfExist) {
    return {
      error: {
        code: 500,
        message: `O CPF: ${cpf} já está viniculado a uma outra conta`,
      },
    };
  }

  return await User.create({ fullName, cpf });
};

const depositWithCpf = async (cpf, amount) => {
  const cpfConverted = formatCPF(cpf);

  const deposit = await User.increment(
    { bank: +amount },
    { where: { cpf: cpfConverted } },
  );

  return deposit;
};

const seeMyAccount = async (cpf) => {
  const cpfConverted = formatCPF(cpf);
  const myAccount = User.findOne({ where: { cpf: cpfConverted } });

  if (!myAccount)
    return {
      error: {
        code: 500,
        message: 'Essa conta não existe',
      },
    };

  return myAccount;
};

module.exports = { depositWithCpf, seeMyAccount, createAccount };
