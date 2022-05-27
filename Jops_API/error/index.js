const badRequestError = require('./badRequest')
const notFoundError = require('./notFound')
const unAuthorizationError = require('./unAuthorization')
const customAPIError = require('./customAPIError')

module.exports = {
    badRequestError,
    notFoundError,
    unAuthorizationError,
    customAPIError
}