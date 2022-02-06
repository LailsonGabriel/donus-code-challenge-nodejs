const validateNameAndCPF = async (req, res, next) => {
  const { fullName, cpf } = req.body;
  if (!fullName || !cpf) {
    return res
      .status(400)
      .json({ message: 'Os campos "CPF" e "fullName" devem ser preenchidos' });
  }
  if (fullName.length < 8) {
    return res
      .status(400)
      .json({ message: 'Preencha o campo "fullName" com seu nome completo' });
  }
  if (cpf.length !== 11) {
    return res
      .status(400)
      .json({ message: 'O campo "cpf" deve conter 11 números' });
  }
  next();
};

module.exports = validateNameAndCPF;
