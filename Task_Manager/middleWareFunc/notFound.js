// This used if users access to links which we not defined
const notFound = (req, res) => {
    res.status(404).json({ "Message":"Not found!" })
}

module.exports = notFound