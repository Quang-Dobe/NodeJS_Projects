const express = require('express')
const jobTask = require('../controller/job')
const router = express.Router()

router.route('/').get(jobTask.getAllJob).post(jobTask.createSingleJob)
router.route('/:id').get(jobTask.getSingleJob).patch(jobTask.updateSingleJob).delete(jobTask.deleteSingleJob)

module.exports = router