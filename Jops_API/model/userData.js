const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userData = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide username"],
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: [true, "Must provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide correct email"
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Must provide password"],
        minLength: 8
    }
})

userData.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userData.methods.createJWT = function() {
    return jwt.sign({ userID:this._id, name:this.name }, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
}

userData.methods.comparePassword = async function(candidatePassword) {
    // const salt = await bcrypt.genSalt(10)
    // candidatePassword = await bcrypt.hash(candidatePassword, salt)
    // if (candidatePassword===this.password) {
    //     return true
    // }
    // return false

    const isTrue = await bcrypt.compare(candidatePassword, this.password)
    return isTrue
}

module.exports = mongoose.model('userData', userData)