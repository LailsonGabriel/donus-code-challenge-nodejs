const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fullName: DataTypes.STRING,
      cpf: { type: DataTypes.STRING, unique: true },
      bank: { defaultValue: 0, type: DataTypes.INTEGER },
    },
    {
      timestamps: false,
    },
  );

  return User;
};

module.exports = User;
