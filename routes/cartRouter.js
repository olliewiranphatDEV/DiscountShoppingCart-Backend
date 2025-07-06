const express = require('express');
const { getCartsByUserID, deleteCartIDByUserID, updateCartIDQuantity, } = require('../controllers/cartController');
const authorization = require('../middlewares/authorization');
const cartRouter = express.Router();


cartRouter.get('/my-carts', authorization, getCartsByUserID);
cartRouter.delete('/delete/:cartID', authorization, deleteCartIDByUserID);
cartRouter.patch('/update-quantity', authorization, updateCartIDQuantity)


module.exports = cartRouter;



