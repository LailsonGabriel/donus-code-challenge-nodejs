require('dotenv').config();
module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'donus_challenger',
    host: process.env.MYSQL_LOCAL,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'donus_challenger',
    host: process.env.MYSQL_LOCAL,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'donus_challenger',
    host: process.env.MYSQL_LOCAL,
    dialect: 'mysql',
  },
};
