const router = require('express').Router();
const rescue = require('express-rescue');

const transferService = require('../services/transferService');
const middlewares = require('../middlewares/');

router.post(
  '/:cpf',
  middlewares.numberIsNotNegative,
  middlewares.validateCPF,
  rescue(async (req, res) => {
    const { cpf } = req.params;
    const transfer = await transferService.transfer(cpf, req.body);
    if (transfer) {
      const { code, message } = transfer.error;
      return res.status(code).json({ message });
    }

    res.status(200).json({ message: 'Transferência realizada com sucesso!' });
  }),
);

module.exports = router;
