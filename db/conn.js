require('dotenv').config()
const Mongoose = require('mongoose')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

async function main() {
  await Mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@node-js-cluster-0.g5iof1o.mongodb.net/GetAPet?retryWrites=true&w=majority&appName=Node-js-Cluster-0`
  )
  console.log("Conectamos ao MongoBD!")
}

main().catch((err) => console.log(err))

module.exports = Mongoose