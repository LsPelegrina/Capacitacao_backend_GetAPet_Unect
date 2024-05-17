const jwt = require('jsonwebtoken')
require('dotenv').config()



const checkToken = (req, res, next) => {

  let token

  if(!req.headers['authorization']) {
    return res.status(401).json({ message: "Acesso negado!"})
  }

  const authHeader = req.headers['authorization']

  if(authHeader.startsWith("Bearer ")){
    token = authHeader.split(" ")[1]
  } else{
    token = authHeader
  }

  if(!token) {
    return res.status(401).json({ message: "Acesso negado!"})
  }

  const secret = process.env.SECRET

  try {

    const decoded = jwt.verify(token, secret)
    req.id = decoded.id
    next()
       
  } catch (err) {
    return res.status(401).json({ message: "Token inválido!"})
  }
}

module.exports = checkToken
