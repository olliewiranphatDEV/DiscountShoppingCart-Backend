const prisma = require('../models');
const TryCatch = require("../utils/tryCatch");
const createError = require("../utils/createError");


exports.getUserDataAccount = TryCatch(async (req, res) => {
    console.log("req.user.userID", req.user.userID);

    const results = await prisma.user.findUnique({
        where: { userID: req.user.userID }
    });

    if (!results) {
        return createError(404, `No have user ID ${req.user.userID} data`)
    }

    res.status(200).json({ message: `Success Get User ID ${req.user.userID} Account`, results })
})


