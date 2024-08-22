const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./config/config.json');

const environment = process.env.NODE_ENV || 'development';
const apiUrl = config[environment].apiUrl;
const apiEnvironment = config[environment].apiEnvironment;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sports API Documentation',
    version: '1.0.0',
    description: 'Documentación de la API',
  },
  servers: [
    {
      url: apiUrl,
      description: 'Servidor de ' + apiEnvironment,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./router.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
