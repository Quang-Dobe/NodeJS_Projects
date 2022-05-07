const notFound = (req, res) => {
    res.status(404).json({ "Message":"Route not found" })
}

module.exports = notFound