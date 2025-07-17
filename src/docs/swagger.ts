import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Secure Wallet API',
      version: '1.0.0',
      description: 'API documentation for wallet service',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
  },
  // remaining: need to change route
  apis: ['./src/routes/*.ts'],
};