const errHandlerFunc = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ "Message":`Something went wrong` })
}

module.exports = errHandlerFunc