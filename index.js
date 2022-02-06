require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const errorMiddleware = require('./src/errors/errorMiddleware.js');

app.use(bodyParser.json());

const userController = require('./src/controllers/userController');

app.use('/user', userController);

const transfersController = require('./src/controllers/transfersController');

app.use('/transfer', transfersController);

app.use(errorMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
