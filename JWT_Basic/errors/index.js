const customAPIError = require('./customAPIError')
const badRequestError = require('./badRequest')
const unAuthenticatedError = require('./unAuthenticated')

// About the status code, we will install an external package named "html-status-codes"
// It's just easier to know which status will be used in each case

module.exports = {
    customAPIError,
    badRequestError,
    unAuthenticatedError
}