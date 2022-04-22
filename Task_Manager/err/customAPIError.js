class customAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomAPIError = (msg, err) => {
    return new customAPIError(msg, err)
}

module.exports = {customAPIError, createCustomAPIError}