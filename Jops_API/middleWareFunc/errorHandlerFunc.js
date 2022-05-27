const {StatusCodes} = require('http-status-codes')
const {customAPIError} = require('../error')

const errorHandlerFunc = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong"
    }

    // If error is badRequest or notFound or unAuthorization (Error from request of user)
    // if (err instanceof customAPIError) {
    //     return res.status(customError.statusCode).json({ "Message":customError.message })
    // }
    // We don't need to use it because when we throw an error which is an instance of customAPIError, 
    // that error is also an instance of Error, but the difference is that we modify the Message and Statuscode

    // This is a special error (not an instance of customAPIError) (Error from database - duplicated email)
    if (err.code && err.code===11000) {
        customError.message = "Duplicated email"
        customError.statusCode = 400
        console.log(err)
    }

    // This is a special error (Error from user - Not provide enough information - name, email, password)
    if (err.name==="ValidationError") {
        customError.statuscode = 400
        customError.message = Object.values(err.errors).map((item) => item.message).join(', ')
    }

    // This is a special error (Error from user - Provide ID params in request is not true)
    if (err.name==="CastError") {
        customError.statusCode = 404
        customError.message = `No item found with id ${req.params.id}`
    }

    return res.status(customError.statusCode).json({ "Message":customError.message })
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "Message":err })
}

module.exports = errorHandlerFunc