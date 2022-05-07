// class customAPIError extends Error {
//     constructor(message, statusCode) {
//         super(message)
//         this.statusCode = statusCode
//     }
// }

// const createCustomAPIError = (msg, statusCode) => {
//     return new customAPIError(msg, statusCode)
// }

class customAPIError extends Error {
    constructor(message) {
        super(message)
    }
}

// module.exports = {customAPIError, createCustomAPIError}
module.exports = {customAPIError}