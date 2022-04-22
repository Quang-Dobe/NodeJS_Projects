const {customAPIError} = require('../err/customAPIError')

const errHandlerFunc = (err, req, res, next) => {
    if (err instanceof customAPIError) {
        return res.status(err.statusCode).json({ "Message":err.message })
    }
    res.status(500).json({ "Message":"Something went wrong" })
}

module.exports = errHandlerFunc