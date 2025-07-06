const prisma = require('../models');
const TryCatch = require("../utils/tryCatch");
const createError = require("../utils/createError");

// GET ALL PRODUCTS
exports.getAllProductsDB = TryCatch(async (req, res) => {
    ///// Get all products in DB:
    const results = await prisma.product.findMany();

    if (results.length === 0) {
        return createError(404, "No have product data")
    }

    res.status(200).json({ message: "Success Get All Products DB", productLength: results.length, results })
})

exports.postADDtoCart = TryCatch(async (req, res) => {
    console.log('req.user.userID ', req.user.userID);
    // console.log('req.body >>', req.body);
    const { productID, productIDPrice, productQuantity } = req.body

    // VALIDATE EXISTING USER_ID
    const existingUser = await prisma.user.findUnique({
        where: { userID: req.user.userID }
    })
    if (!existingUser) {
        return res.status(400).json({ message: 'User does not exist!' });
    }

    // CALCULATE totalPrice
    const totalPriceItem = productIDPrice * productQuantity
    console.log('totalPriceItem', totalPriceItem);

    // INSERT DATA - Cart, ProductOnCart Table
    const results = await prisma.cart.create({
        data: {
            customerID: req.user.userID,
            totalPriceItem: totalPriceItem,
            ProductOnCart: {
                create: [
                    {
                        productID: productID,
                        quantity: productQuantity
                    }
                ]
            }
        }

    })
    console.log('results', results);

    res.status(200).json({ status: "SUCCESS", message: "ADD to Cart already!", results })
})