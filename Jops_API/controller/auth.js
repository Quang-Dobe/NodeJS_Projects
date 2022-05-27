const userData = require('../model/userData')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')
const {badRequestError, unAuthorizationError} = require('../error')

const register = async (req, res) => {
    // const {name, email, password} = req.body
    // const salt = await bcrypt.genSalt(10)
    // const hashPassword = await bcrypt.hash(password, salt)
    // const tempUser = {name, email, password:hashPassword}
    // const user = await userData.create({...tempUser})

    // Because of using middleWareFunc when "save" new data to database, so we will do hashing password in middleWareFunc
    const user = await userData.create(req.body)
    // const token = jwt.sign({ userID:user._id, name:user.name }, process.env.JWT_SECRET, {expiresIn:'1d'})

    // But we can use methods of Schema for creating token based on user-info
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ username:user.name, token })
}

const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new badRequestError("Please provide enough information!")
    }

    const user = await userData.findOne({email})
    // Check email exists or not in database
    if (!user) {
        throw new unAuthorizationError("Invalid Credenticals")
    }
    // Check password is correct or not
    const isPasswordTrue = await user.comparePassword(password)
    if (isPasswordTrue==false) {
        throw new unAuthorizationError("Invalid Credenticals")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ username:user.name, token })
}

module.exports = {
    register,
    login
}