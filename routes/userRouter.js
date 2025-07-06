const express = require('express')
const { getUserDataAccount } = require('../controllers/userController')
const authorization = require('../middlewares/authorization')
const userRouter = express.Router()

// ACCOUNT
userRouter.get('/my-account', authorization, getUserDataAccount)


module.exports = userRouter