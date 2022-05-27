const express = require('express')
const authTask = require('../controller/auth')

const router = express.Router()

router.route('/register').post(authTask.register)
router.route('/login').post(authTask.login)

module.exports = router