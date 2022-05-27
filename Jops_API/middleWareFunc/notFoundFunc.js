const {StatusCodes} = require('http-status-codes')

const notFoundFunc = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ "Message":"Router not found"})
}

module.exports = notFoundFunc