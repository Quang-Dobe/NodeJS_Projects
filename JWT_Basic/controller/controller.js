const jwt = require('jsonwebtoken')
const {badRequestError} = require('../errors')
// const {createCustomAPIError, customAPIError} = require('../errors/customAPIError')

const login = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
        // return next(createCustomAPIError('Fake login/ Register/ Signup route', 400))
        // Instead of returning a next-function creating an instance of customAPIError, 
        // we can use "throw new customAPIError" (Because we have already used "express-async-errors" package)
        throw new badRequestError('Fake login/ Register/ Signup route')
    }
    
    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})

    return res.status(200).json({ "Message":"User created", token })
}

const dashboard = async (req, res) => {
    // Get a random number between 0 and 99
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({
        // "Message": "Hello Cabe",
        "Message": `Hello ${req.user.username}`,
        "Secret": `Here is your authorized data. Your lucky number is ${luckyNumber}`
    })
    
}

module.exports = {login, dashboard}