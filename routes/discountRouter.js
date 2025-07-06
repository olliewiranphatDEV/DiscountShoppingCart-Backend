const express = require('express');
const discountRouter = express.Router();
const { getAllDiscounts } = require('../controllers/discountController');


discountRouter.get('/all-discounts', getAllDiscounts);

module.exports = discountRouter;
