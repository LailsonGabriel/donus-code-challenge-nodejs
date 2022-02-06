const { User } = require('../models');
const formatCPF = require('../utils/cpfFormater');
const userService = require('./userService');

const transfer = async (cpf, body) => {
  const cpfReceiver = formatCPF(cpf);
  const cpfSender = formatCPF(body.cpf);
  const { amount } = body;

  const myAccount = await User.findOne({ where: { cpf: cpfSender } });

  if (amount > myAccount.bank) {
    return {
      error: {
        code: 500,
        message: `Você não possui ${amount} em sua conta bancária`,
      },
    };
  }

  await User.decrement({ bank: +amount }, { where: { cpf: cpfSender } });
  await User.increment({ bank: +amount }, { where: { cpf: cpfReceiver } });
};

module.exports = { transfer };
