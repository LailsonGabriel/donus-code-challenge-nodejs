module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.PASS,
    database: 'donus_challenger',
    host: process.env.PORT,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.PASS,
    database: 'donus_challenger',
    host: process.env.PORT,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.PASS,
    database: 'donus_challenger',
    host: process.env.PORT,
    dialect: 'mysql',
  },
};
