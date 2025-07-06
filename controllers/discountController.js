const prisma = require('../models');
const TryCatch = require("../utils/tryCatch");
const createError = require("../utils/createError");


exports.getAllDiscounts = TryCatch(async (req, res) => {

    const results = await prisma.discount.findMany();
    if (results.length === 0) {
        return createError(404, "No have discount data")
    }

    res.status(200).json({ message: "Success Get All Discounts DB", discountLength: results.length, results })
})