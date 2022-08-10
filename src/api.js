const express = require('express');
require('express-async-errors');
// ref. de consulta: https://www.npmjs.com/package/express-async-errors

const loginRoute = require('./routes/loginRoute');
const usersRoutes = require('./routes/usersRoutes');
const categoryRoutes = require('./routes/categoryRoute');

// ...
const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', usersRoutes);
app.use('/categories', categoryRoutes);
// ...
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
