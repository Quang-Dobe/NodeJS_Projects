const express = require('express')
const {...controller} = require('../Controller/Controller')

const router = express.Router()

router.route('/').get(controller.getAllProducts)
router.route('/static').get(controller.getAllProductStatic)

module.exports = router