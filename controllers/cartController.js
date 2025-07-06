const prisma = require('../models');
const TryCatch = require("../utils/tryCatch");
const createError = require("../utils/createError");



exports.getCartsByUserID = TryCatch(async (req, res) => {
    // console.log('req.user >>', req.user);

    const results = await prisma.cart.findMany({
        where: {
            customerID: parseInt(req.user.userID),
            status: "onProcess"
        },
        include: {
            ProductOnCart: {
                include: {
                    product: true
                }
            }
        }
    });
    console.log("cart, results", results);

    if (!results) {
        return createError(404, `No have cart data for this userID ${req.user.userID}`)
    }

    res.status(200).json({ message: `Success Get cart data for this userID ${req.user.userID}`, results })
})

exports.deleteCartIDByUserID = TryCatch(async (req, res) => {

    if (!req.params.cartID) {
        return createError(400, "Please send cartID")
    }
    console.log('req.params.cartID >>', req.params.cartID);

    await prisma.cart.delete({
        where: {
            cartID: parseInt(req.params.cartID),
            customerID: req.user.userID
        }
    })

    res.status(200).json({ message: `Success delete cartID ${req.params.cartID} of userID ${req.user.userID} ` })
})




