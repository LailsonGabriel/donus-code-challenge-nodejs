const validateCPF = async (req, res, next) => {
  const { cpf } = req.params;
  if (cpf.length !== 11) {
    return res
      .status(400)
      .json({ message: 'O campo "cpf" deve conter 11 números' });
  }
  next();
};

module.exports = validateCPF;
