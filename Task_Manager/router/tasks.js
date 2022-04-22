const express = require('express')
const { ...queryTask } = require('../controller/tasks')
const router = express.Router()

// We can use this way
// router.route('/').get((req, res) => {
//     res.send("All item")
// })

//But if the callback function is big, put it in another file and at this file,
// call that callback-function from that external file again
// With a specific link ('/api/v1/tasks'), we can get all the task or post a task (Because it doesb't require any params)
router.route('/').get(queryTask.getAllTasks).post(queryTask.createTask)
router.route('/:id').get(queryTask.getTask).patch(queryTask.updateTask).delete(queryTask.deleteTask)

module.exports = router