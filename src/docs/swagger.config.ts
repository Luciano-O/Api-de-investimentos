const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Luciano Oliveira Api de investimentos',
      description: 'Api que registra ações, clientes, compras e vendas de ações',
      version: '1.0',
    },
    servers: [
      {
        url: 'http://18.231.1.209:3001',
        description: 'Servidor deployado',
      }, {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Servidor Local',
      }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./dist/routes/*.js'],
};

export default swaggerConfig;
