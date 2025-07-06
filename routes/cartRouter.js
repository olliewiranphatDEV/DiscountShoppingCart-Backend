const express = require('express');
const { getCartsByUserID } = require('../controllers/cartController');
const authorization = require('../middlewares/authorization');
const cartRouter = express.Router();


cartRouter.get('/my-carts', authorization, getCartsByUserID);
// cartRouter.delete('/cart/delete-checked', authorization, deleteCheckedItem)
// cartRouter.patch('/cart/update-quantity', authorization, updateQuantity) 


module.exports = cartRouter;



