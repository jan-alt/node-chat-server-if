const { Router } = require('express')
const { login, register, getCurrentUser, getUsers } = require('../controllers/userController')
const auth = require('../middlewares/auth')

const userRouter = Router()

userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/user', auth, getCurrentUser)
userRouter.get('/users', auth, getUsers)

module.exports = userRouter