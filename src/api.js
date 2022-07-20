const express = require('express');
require('express-async-errors');
// ref. de consulta: https://www.npmjs.com/package/express-async-errors
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const usersRoutes = require('./routes/usersRoutes');
const loginRoute = require('./routes/loginRoute');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', usersRoutes);

app.use(errorHandlerMiddleware);

// ...
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
