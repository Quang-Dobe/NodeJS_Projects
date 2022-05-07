require('dotenv').config()
require('express-async-errors')

const express = require('express')
const router = require('./router/router')
const notFound = require('./middleWareFunction/notFound')
const errHandler = require('./middleWareFunction/errHandlerFunc')
const PORT = process.env.PORT || 3000

const app = express()

// Middle-ware function
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1', router)
app.use(notFound)
app.use(errHandler)

const start = (async () => {
    try {
        app.listen(PORT, () => console.log(`Connecting to port ${PORT}...`))
    } catch (error) {
        console.log("Program can't run!!!")
        console.log(error)
    }
})
start()

// 6:28