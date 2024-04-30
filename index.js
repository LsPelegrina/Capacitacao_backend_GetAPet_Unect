const express = require('express')
const Mongoose = require('./db/conn')
const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())


app.listen(3000)

const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)
