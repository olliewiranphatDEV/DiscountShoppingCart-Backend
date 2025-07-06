const express = require('express');
const checkoutRouter = express.Router();
const { postCheckoutOrderPayment, getOrderPaymentSummary } = require('../controllers/checkoutController');
const authorization = require('../middlewares/authorization');


// FINAL-PRICE ORDER PAYMENT
// STEP 1
checkoutRouter.post('/order-payment', authorization, postCheckoutOrderPayment); // CALCULATE DISCOUNT - KEEP INTO ProductOnOrder
// STEP 2
checkoutRouter.get('/order-summary/:orderID', authorization, getOrderPaymentSummary); // CALCULATE DISCOUNT - KEEP INTO ProductOnOrder

module.exports = checkoutRouter;
