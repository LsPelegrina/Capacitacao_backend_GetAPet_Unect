const router = require('express').Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helpers/verify-token')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', verifyToken, UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, UserController.editUser)
router.delete('/:id', verifyToken, UserController.deleteUser)

module.exports = router