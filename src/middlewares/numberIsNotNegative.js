const numberIsNotNegative = async (req, res, next) => {
  const { amount } = req.body;
  if (amount === 0)
    return res
      .status(500)
      .json({
        message:
          'Somente valores a cima de R$0,00 para depósitos ou transferências',
      });
  if (Math.sign(amount) === -1)
    return res
      .status(500)
      .json({ message: 'Não aceitamos valores negativos!' });
  next();
};

module.exports = numberIsNotNegative;
