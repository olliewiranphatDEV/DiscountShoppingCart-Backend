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
        },
        orderBy: {
            cartID: "asc"
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


exports.updateCartIDQuantity = TryCatch(async (req, res) => {
    const { cartID, productID, quantity } = req.body;


    if (!cartID || !productID || quantity < 1) {
        return createError(400, "Invalid cart data");
    }

    console.log('cartID >>', cartID);
    console.log('productID >>', productID);
    console.log("quantity >>", quantity);


    // CALCULATE NEW-totalPriceItem = quantity * product.price
    const product = await prisma.product.findUnique({
        where: { productID: productID }
    });

    if (!product) {
        return createError(404, `No have this productID ${productID}`);
    }
    console.log('product.price >>', parseInt(product.price));
    const newTotalPriceItem = parseInt(product.price) * quantity;
    console.log('newTotalPriceItem >>', newTotalPriceItem);

    // UPDATE quantity INTO ProductOnCart
    const updateQuantity = await prisma.productOnCart.update({
        where: {
            productID_cartID: {
                productID,
                cartID
            }
        },
        data: { quantity }
    });
    console.log('updateQuantity >>', updateQuantity);

    // UPDATE totalPriceItem INTO Cart
    const updateTotalPriceItem = await prisma.cart.update({
        where: { cartID },
        data: { totalPriceItem: newTotalPriceItem }
    });
    console.log('updateTotalPriceItem >>', updateTotalPriceItem);

    res.status(200).json({ message: "Cart updated successfully", results: { updateQuantity, updateTotalPriceItem } });
});





