const express = require('express');
const { getCartsByUserID, deleteCartIDByUserID } = require('../controllers/cartController');
const authorization = require('../middlewares/authorization');
const cartRouter = express.Router();


cartRouter.get('/my-carts', authorization, getCartsByUserID);
cartRouter.delete('/delete/:cartID', authorization, deleteCartIDByUserID);
// cartRouter.patch('/cart/update-quantity', authorization, updateQuantity) 


module.exports = cartRouter;



