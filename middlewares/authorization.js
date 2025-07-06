const createError = require("../utils/createError")
const TryCatch = require("../utils/tryCatch")
const jwt = require('jsonwebtoken')

module.exports = TryCatch(async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer')) {
        throw createError(400, "Unthorized!")
    }

    ///// Verify Token: + get userData
    const token = authorization.split(' ')[1]
    // console.log('token', token);
    if (!token) throw createError(400, "No token provided")

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log('payload', payload);
    const { iat, exp, ...userData } = payload


    req.user = userData


    next()
})