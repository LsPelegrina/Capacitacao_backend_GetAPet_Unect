const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController {

  static async register(req, res) {
    
    const {name, email, phone, password, confirmpassword} = req.body

    //validações
    if(!name) {
      res.status(422).json({ message: 'O nome é obrigatório!'})
      return
    }

    if(!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!'})
      return
    }

    if(!phone) {
      res.status(422).json({ message: 'O numero de telefone é obrigatório!'})
      return
    }

    if(!password) {
      res.status(422).json({ message: 'A senha é obrigatória!'})
      return
    }

    if(!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatório!'})
      return
    }

    if(password !== confirmpassword) {
      res.status(422).json({ message: 'A senha e a confirmação de senha devem ser iguais!'})
      return
    }

    const userExists = await User.findOne({email: email})
    if(userExists){
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!'})
      return
    }

    //create a password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    })

    try {
      const newUser = await user.save()
      await createUserToken(newUser, req, res)
    } catch(err) {
      res.status(500).json({ message: err })
    }
  }

  static async login(req, res) {

    const {email, password} = req.body

    if(!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!'})
      return
    }

    if(!password) {
      res.status(422).json({ message: 'A senha é obrigatória!'})
      return
    }

    const user = await User.findOne({email: email})
    if(!user){
      res.status(422).json({ message: 'As credenciais inseridas estão incorretas!'})
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
      res.status(422).json({ message: 'As credenciais inseridas estão incorretas!'})
      return
    }

    await createUserToken(user, req, res)
  }

  static async checkUser(req, res) {

    let currentUser
    
    if(req.headers.authorization) {

      currentUser = await User.findById(req.id)

      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {

    const id = req.params.id
    
    const user = await User.findById(id).select("-password")

    if(!user){
      res.status(422).json({ message: 'Usuário não encontrado!'})
      return
    }
    
    res.status(200).json({ user })
  }

  static async editUser(req, res) {
    
    const id = req.params.id

    if(id !== req.id){
      res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!' })
      return
    } 

    const user = await User.findOne({_id: id})

    const {name, email, phone, password, confirmpassword} = req.body


    if(!name) {
      res.status(422).json({ message: 'O nome é obrigatório!'})
      return
    }

    user.name = name

    if(!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!'})
      return
    }

    const userExists = await User.findOne({email: email})

    if(user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!'})
      return
    }

    user.email = email

    if(!phone) {
      res.status(422).json({ message: 'O numero de telefone é obrigatório!'})
      return
    }

    user.phone = phone

    if(password != confirmpassword){
      res.status(422).json({ message: 'As senhas não conferem!'})
      return
    } else if(password === confirmpassword && password != null) {
      
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash

    }

    try {

      await User.findOneAndUpdate(
        {_id: user.id},
        {$set: user},
        {new: true},
      )
      res.status(200).json({ message: 'Usuário atualizado com sucesso!'})
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  static async deleteUser(req, res) {

    const id = req.params.id

    if(id !== req.id){
      res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!' })
      return
    } 

    const user = await User.findOne({_id: id})

    if(!user) {
      res.status(422).json({ message: 'O usuário não foi encontrado!'})
      return
    }
    
    try {
      await User.deleteOne({_id: req.id})
      res.status(200).json({message: 'O Usuário foi removido com sucesso!'})
    } catch(error) {
      res.status(500).json({error: error})
    }
  }
}
