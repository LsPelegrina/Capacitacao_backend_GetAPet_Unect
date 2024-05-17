const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Desenvolvimento da API GetAPet',
    description: 'O projeto consiste no desenvolvimento de uma API RESTful completa para um sistema de adoção de pets, necessitando dos modelos de usuários e pets. Foi utilizado node.js, Express e mongoDB.'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/UserRoutes.js', './routes/PetRoutes.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./index.js'); 
});