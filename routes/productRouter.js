const express = require('express')
const { getAllProductsDB, postADDtoCart } = require('../controllers/productController')
const authorization = require('../middlewares/authorization')
const productRouter = express.Router()

productRouter.get('/all-products', getAllProductsDB)

// USER
productRouter.post('/add-to-cart', authorization, postADDtoCart)

module.exports = productRouter