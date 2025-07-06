const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8084
const cors = require("cors")
const morgan = require("morgan")

const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const discountRouter = require("./routes/discountRouter")
const cartRouter = require("./routes/cartRouter")
const checkoutRouter = require("./routes/checkoutRouter")
const authRouter = require("./routes/authRouter")

app.use(express.json({ limit: "10mb" }))
app.use(cors())
app.use(morgan("dev"))


// TEST SERVER
app.get("/", (req, res) => {
    res.send("API is working!");
});

app.get('/favicon.ico', (req, res) => res.status(204));



// Router : 
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/checkout', checkoutRouter)
app.use('/discount', discountRouter) // INFORMATION

///// Not Found Path :
app.use(notFound)

///// error from path and router
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on PORT ${port}`))