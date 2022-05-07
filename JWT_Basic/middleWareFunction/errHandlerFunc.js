const {customAPIError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const errHandlerFunc = (err, req, res) => {
    if (err instanceof customAPIError) {
        console.log("The program entered this line of code")
        res.status(err.statusCode).json({ "Message":`${err.message}`})
        return;
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "Message":"Some thing went wrong!" })
}

module.exports = errHandlerFunc