const {StatusCodes} = require('http-status-codes')
const customAPIError = require('./customAPIError')

class unAuthorizationError extends customAPIError {
    constructor(message) {
        super(message)
        this.statusCodes = StatusCodes.UNAUTHORIZED
    }
}

module.exports = unAuthorizationError
