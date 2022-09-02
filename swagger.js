const swagger = require('swagger-autogen')();

const outputFile = './swagger-output.json';

const endpointsFile = [
  'src/routers/bPostRouter.js',
  'src/routers/cotegoryRouter.js',
  'src/routers/loginRouter.js',
  'src/routers/userRouter.js',
];

swagger(outputFile, endpointsFile);