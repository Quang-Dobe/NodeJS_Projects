const {StatusCodes} = require('http-status-codes')
const customAPIError = require('./customAPIError')

class notFoundError extends customAPIError {
    constructor(message) {
        super(message)
        this.statusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = notFoundError