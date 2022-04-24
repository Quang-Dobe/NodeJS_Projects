const notFound = (req, res) => {
    res.status(404).json({ "Message":"Not found" })
}

module.exports = notFound