const depositValidate = async (req, res, next) => {
  const { amount } = req.body;
  if (amount > 2000) {
    return res.status(400).json({
      message:
        'Por questão de segurança seus depósitos não podem ser maior do que R$2.000;',
    });
  }
  next();
};

module.exports = depositValidate;
