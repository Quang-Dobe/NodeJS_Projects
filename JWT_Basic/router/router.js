const express = require('express')
const {login, dashboard} = require('../controller/controller')
const authorizationFunc = require('../middleWareFunction/auth')
const router = express.Router()

router.route('/login').post(login)
router.route('/dashboard').get(authorizationFunc, dashboard)


module.exports = router