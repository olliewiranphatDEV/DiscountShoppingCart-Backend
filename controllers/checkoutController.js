const prisma = require('../models');
const TryCatch = require("../utils/tryCatch");
const createError = require("../utils/createError");

// OREDER PROCEED - CAL DISCOUNT FOR FINAL PRICE SUMMARY
exports.postCheckoutOrderPayment = TryCatch(async (req, res) => {
    console.log('req.user.userID >>', req.user.userID);
    console.log('req.body', req.body);
    const { userCarts, orderFinalPrice, productsOrderData, discountsOrderData } = req.body
    if (!orderFinalPrice || productsOrderData.length === 0 || discountsOrderData.length === 0) {
        return createError(400, "Bad request, Incomplete data")
    }
    // CREATE ORDER TABLE - OrderID + ProductOnOrder TABLE + DiscountOnOrder TABLE
    const results = await prisma.order.create({
        data: {
            orderFinalPrice,
            customerID: req.user.userID,
            ProductOnOrder: {
                create: productsOrderData.map(item => ({
                    productID: item.productID,
                    quantity: item.quantity,
                    totalPriceItem: item.totalPriceItem
                }))
            },
            DiscountOnOrder: {
                create: discountsOrderData.map(item => ({
                    discounID: item.discountID,
                    priceAfterDiscount: item.priceAfterDiscount
                }))
            }
        }
    })
    console.log('results >>', results);

    // DELETE ProductOnCart EVERY cartID OF userID
    await prisma.productOnCart.deleteMany({
        where: {
            cartID: {
                in: userCarts.map(cart => cart.cartID)
            }
        }
    })

    // DELETE cart OF user นี้
    await prisma.cart.updateMany({
        where: {
            cartID: {
                in: userCarts.map(cart => cart.cartID)
            },
            customerID: req.user.userID
        },
        data: {
            status: "payment"
        }
    })


    res.status(200).json({
        message: `Success create ${results.orderID} data`,
        results
    })
})

exports.getOrderPaymentSummary = TryCatch(async (req, res) => {

    if (!req.params.orderID) {
        return createError(400, "Bad request, Please send orderID")
    }
    console.log("req.params.orderID", req.params.orderID);


    const results = await prisma.order.findMany({
        where: {
            orderID: parseInt(req.params.orderID),
            customerID: req.user.userID
        },
        include: {
            ProductOnOrder: {
                include: {
                    product: true
                }
            },
            DiscountOnOrder: {
                include: {
                    discount: true
                }
            }
        }
    })
    console.log('results >>', results);
    if (!results) {
        return createError(404, `No have this orerID ${req.params.orderID} data`)
    }

    res.status(200).json({
        message: `Success orerID ${req.params.orderID} data`,
        results
    })
})