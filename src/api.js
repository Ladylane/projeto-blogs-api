const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const rotaLogin = require('./routers/loginRouter');
const rotaUser = require('./routers/userRouter');
const rotaCat = require('./routers/cotegoryRouter');
const rotaBlogPost = require('./routers/bPostRouter');
const erroMid = require('./database/middleware/errorMiddleware');

const app = express();

app.use(express.json());

app.use(rotaLogin);
app.use(rotaUser);
app.use(rotaCat);
app.use(rotaBlogPost);
app.use(erroMid);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
