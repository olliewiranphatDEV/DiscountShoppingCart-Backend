const express = require('express')
const { authSignin, authSignup } = require('../controllers/authController')
const authRouter = express.Router()

authRouter.post('/register', authSignup)
authRouter.post('/signin', authSignin)


module.exports = authRouter