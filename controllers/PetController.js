const Pet = require('../models/Pet')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {

  static async create(req, res) {

    const {name, age, weight, color} = req.body
    const available = true

    if(!name) {
      res.status(422).json({ message: 'O nome é obrigatório!'})
      return
    }

    if(!age) {
      res.status(422).json({ message: 'A idade é obrigatória!'})
      return
    }

    if(!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!'})
      return
    }

    if(!color) {
      res.status(422).json({ message: 'A cor é obrigatória!'})
      return
    }

    const user = await User.findById(req.id).select("-password")

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
      },
    })

    try {
      
      const newPet = await pet.save()
      res.status(201).json({ message: 'Pet cadastrado com sucesso!', newPet})

    } catch (error) {
      
      res.status(500).json({ message: error})
    }
  }


  static async getAll(req, res) {

    const pets = await Pet.find().sort('-createdAt')

    res.status(200).json({ pets: pets })
  }

  static async getAllUserPets(req, res) {

    const user = await User.findById(req.id).select("-password")

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

    res.status(200).json({ pets })

  }

  static async getAllUserAdoptions(req, res) {

    const user = await User.findById(req.id).select("-password")

    const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

    res.status(200).json({ pets })
  }

  static async getPetById(req, res) {

    const id = req.params.id

    if(!ObjectId.isValid(id)){
      res.status(422).json({ message: 'Id inválido!' })
      return
    }

    const pet = await Pet.findOne({_id: id})

    if(!pet){
      res.status(404).json({ message: 'Pet não encontrado!'} )
      return
    }

    res.status(200).json({ pet: pet })
  }

  static async removePetById(req, res) {
    
    const id = req.params.id
    const pet = await Pet.findOne({_id: id})

    if(!ObjectId.isValid(id)){
      res.status(422).json({ message: 'Id inválido!' })
      return
    }

    if(!pet){
      res.status(404).json({ message: 'Pet não encontrado!'} )
      return
    }

    const user = await User.findById(req.id).select("-password")

    if(!user) {
      res.status(404).json({ message: 'Token Inválido!'})
      return
    }

    if(pet.user._id.toString() !== user._id.toString()){
      res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!'} )
      return
    }

    await Pet.findByIdAndDelete(id)

    res.status(200).json({ message: 'Pet removido com sucesso!' })
  }

  static async updatePetById(req, res) {

    const id = req.params.id
    const pet = await Pet.findOne({_id: id})
    const user = await User.findById(req.id).select("-password")

    if(!user) {
      res.status(404).json({ message: 'Token Inválido!'})
      return
    }

    const {name, age, weight, color} = req.body

    const updatedData = {}

    if(!pet){
      res.status(404).json({ message: 'Pet não encontrado!'} )
      return
    }

    if(pet.user._id.toString() !== user._id.toString()){
      res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!'} )
      return
    }

    if(!name) {
      res.status(422).json({ message: 'O nome é obrigatório!'})
      return
    } else {
      updatedData.name = name
    }

    if(!age) {
      res.status(422).json({ message: 'A idade é obrigatória!'})
      return
    } else {
      updatedData.age = age
    }

    if(!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!'})
      return
    } else {
      updatedData.weight = weight
    }

    if(!color) {
      res.status(422).json({ message: 'A cor é obrigatória!'})
      return
    } else {
      updatedData.color = color
    }

    await Pet.findByIdAndUpdate(id, updatedData)

    res.status(200).json({ message: 'Pet atualizado com sucesso!'})
  }

  static async schedule(req, res) {

    const id = req.params.id
    const pet = await Pet.findOne({_id: id})
    const user = await User.findById(req.id).select("-password")

    if(!user) {
      res.status(404).json({ message: 'Token Inválido!'})
      return
    }

    if(!pet){
      res.status(404).json({ message: 'Pet não encontrado!'} )
      return
    }

    if(pet.user._id.equals(user._id)){
      res.status(422).json({ message: 'Você não pode agendar uma visita com seu próprio pet!'} )
      return
    }

    if(pet.adopter) {
      if(pet.adopter._id.equals(user._id)){
        res.status(422).json({ message: 'Você já agendou uma visita para este Pet!'} )
        return
      }
    }

    pet.adopter = {
      _id: user._id,
      name: user.name
    }

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({ message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}!` })
  }

  static async concludeAdoption(req, res) {

    const id = req.params.id
    const pet = await Pet.findOne({_id: id})
    const user = await User.findById(req.id).select("-password")

    if(!user) {
      res.status(404).json({ message: 'Token Inválido!'})
      return
    }

    if(!pet){
      res.status(404).json({ message: 'Pet não encontrado!'} )
      return
    }

    if(pet.user._id.toString() !== user._id.toString()){
      res.status(422).json({ message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde!'} )
      return
    }

    pet.available = false

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({ message: 'Parabéns! O ciclo de adoção foi finalizado com sucesso!'} )
  }
}
