const express = require('express');
const rotaLogin = require('./routers/loginRouter');
const erroMid = require('./database/middleware/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/login', rotaLogin);
app.use(erroMid);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
