require('dotenv').config()

const connectDB = require('./db/ConnectDB')
const products = require('./model/Products')
const addedProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        // Delete all products in database
        await products.deleteMany()
        // Create products in "products.json" in database
        await products.create(addedProducts)
        console.log("Success!")
        process.exit(0)
    } catch(err) {
        console.log("Something went wrong!")
        console.log(err)
        process.exit(1)
    }
}

start()