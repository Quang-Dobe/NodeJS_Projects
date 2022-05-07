const jwt = require('jsonwebtoken')
const {unAuthenticatedError} = require('../errors')

const authorizationFunc = async (req, res, next) => {
    // When we use postman and use get-method, we must provide 'authorization' in headers
    // But when we use on browser, in file "browser-app.js" in folder "public", the program automaticly add 'authorization' in headers
    // Note: When receiving a request headers, all properties are lowercase strings
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Status code: 401 - Unauthorized
        throw new unAuthenticatedError('No token provided')
    }

    // Decode token
    try {
        const decodedToken = jwt.decode( authHeader.split(' ')[1] )
        // console.log(decodedToken)
        const {id, username} = decodedToken
        req.user = {id, username}
    } catch (error) {
        throw new unAuthenticatedError('Not authorized to access this route')
    }

    next()
}

module.exports = authorizationFunc