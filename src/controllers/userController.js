const router = require('express').Router();
const rescue = require('express-rescue');
const userService = require('../services/userService');

const middlewares = require('../middlewares/');

router.post(
  '/',
  middlewares.validateNameAndCPF,
  rescue(async (req, res) => {
    const personalData = req.body;

    const create = await userService.createAccount(personalData);

    if (create.error) {
      const { code, message } = create.error;
      return res.status(code).json({ message });
    }

    return res
      .status(201)
      .json({ message: 'Sua conta bancária foi criada com Sucesso!' });
  }),
);

router.put(
  '/:cpf',
  middlewares.numberIsNotNegative,
  middlewares.validateCPF,
  middlewares.depositValidate,
  rescue(async (req, res) => {
    const { cpf } = req.params;
    const { amount } = req.body;

    const deposit = await userService.depositWithCpf(cpf, amount);

    if (!deposit) {
      return res.status(500).json({ message: 'Algo deu errado!' });
    }

    return res.status(204).json();
  }),
);

router.get(
  '/:cpf',
  middlewares.validateCPF,
  rescue(async (req, res) => {
    const { cpf } = req.params;

    const userAccount = await userService.seeMyAccount(cpf);

    if (userAccount.error) {
      const { code, message } = userAccount.error;
      return res.status(code).json({ message });
    }

    return res.status(200).json(userAccount);
  }),
);

module.exports = router;
