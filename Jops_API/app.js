require('dotenv').config()
require('express-async-errors')

const express = require('express')

// Extra security package
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const connectDB = require('./db/connectDB')
const authRouter = require('./router/auth')
const jobRouter = require('./router/job')
const authorization = require('./middleWareFunc/authorization')
const notFoundFunc = require('./middleWareFunc/notFoundFunc')
const errorHandlerFunc = require('./middleWareFunc/errorHandlerFunc')
const port = process.env.PORT || 3000
const app = express()

app.use(rateLimiter({ window:15*60*1000, max:100 })) // 15 minutes and max 100 requests
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res) => {
    res.status(200).json({ "Message":"Welcome to my website!" })
})

app.set('trust proxy', 1)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/job', authorization, jobRouter)
app.use(errorHandlerFunc)
app.use(notFoundFunc)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Connecting to port ${port}`))
    } catch (error) {
        console.log("Something went wrong~")
    }
}
start()

// 9:04