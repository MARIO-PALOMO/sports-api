const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sports API Documentation',
    version: '1.0.0',
    description: 'Documentación de la API',
  },
  servers: [
    {
      url: 'http://localhost:3105/api', // Base URL para las rutas de tu API
      description: 'Servidor de Desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./router.js'], // Ajusta el patrón para coincidir con la ubicación de tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
