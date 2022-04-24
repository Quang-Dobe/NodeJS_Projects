require('dotenv').config()
require('express-async-errors')

const express = require('express')
const products = require('./Router/Router')
const connectDB = require('./db/ConnectDB')
const notFound = require('./MiddleWareFunc/NotFound')
const errHandlerFunc = require('./MiddleWareFunc/ErrHandlerFunc')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api/v1/products', products)
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Welcome to my website</h1>`)
})

app.use(notFound)
app.use(errHandlerFunc)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Connecting to port ${port}...`)
        })
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}

start()