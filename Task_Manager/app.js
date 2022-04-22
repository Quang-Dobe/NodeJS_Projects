require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const connectDB = require('./db/connect')
const tasks = require('./router/tasks')
const errHandlerFunc = require('./middleWareFunc/errHandlerFunc')
const notFound = require('./middleWareFunc/notFound')

// Middleware
app.use(express.json())

app.get('/HomePage', (req, res) => {
    res.send(`<h1>Welcome to my website</h1>`)
})

// Router: Look like all method in a specific route will be put on one place
app.use('/api/v1/tasks', tasks)

// If we got some err
app.use(errHandlerFunc)
// If users access to links which we haven't defined yet
app.use(notFound)

// We will use blocking-code here because we want my application connected to database before
// creating a sever for listening client
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Connecting add port ${port}...`))
    } catch (err) {
        console.log(err)
    }
}
start()