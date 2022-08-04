const express = require('express');
require('express-async-errors');
// ref. de consulta: https://www.npmjs.com/package/express-async-errors

const authRoute = require('./routes/authRoute');
// const usersRoutes = require('./routes/usersRoutes');
// const authorization = require('./middlewares/authorization');
// const categoryRoute = require('./routes/categoryRoute');
// const postRoute = require('./routes/postRoute');

// ...

const app = express();

app.use(express.json());

app.use('/login', authRoute);
// app.use('/user', usersRoutes);
// app.use('/categories', authorization.auth, categoryRoute);
// app.use('/post', authorization.auth, postRoute);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
});

// ...
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
