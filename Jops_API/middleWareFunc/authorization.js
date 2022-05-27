const jwt = require('jsonwebtoken')
const userData = require('../model/userData')
const {unAuthorizationError} = require('../error')


const authorizationFunc = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new unAuthorizationError("Authentication invalid")
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET)
        req.user = { userID:decodedToken.userID, name:decodedToken.name }
        next()
    } catch (error) {
        throw new unAuthorizationError("Authentication invalid")
    }
}

module.exports = authorizationFunc