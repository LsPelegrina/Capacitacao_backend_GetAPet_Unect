const express = require('express')
const Mongoose = require('./db/conn')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())


app.listen(3000)

const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
