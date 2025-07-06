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




