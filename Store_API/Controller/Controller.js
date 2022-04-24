// const products = require('../model/Products')

const getAllProductStatic = async (req, res) => {
    // So, when we throw an error here, to simly resolve, we just need to define "express-async-errors"
    throw new Error("Throwing a new error")
    res.status(200).json({ "Message":"Products testing route" })
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ "Message":"Products route" })
}

module.exports = {
    getAllProductStatic,
    getAllProducts
}