const Task = require('../model/Task')
const asyncWrapper = require('../middleWareFunc/asyncFunc')
const {createCustomAPIError} = require('../err/customAPIError')

const getAllTasks = asyncWrapper (async (req, res, next) => {
    let tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const getTask = asyncWrapper (async (req, res, next) => {
    let task = await Task.findOne({ _id:req.params.id })
    if (!task) {
        return next(createCustomAPIError(`No task with ID ${req.params.id}`, 404))
    }
    res.status(200).json({ task })
})

const createTask = asyncWrapper (async (req, res, next) => {
    // Depend on what type of properties you wanna to get in the 'Task.js file' in 'Model folder'
    // Database just append new object with the same properties you defined and ignore all of any type of other properties
    let task = await Task.create(req.body)
    res.status(200).json({ task })
})

const updateTask = asyncWrapper (async (req, res, next) => {
    // Find task with given ID and update. Put runValidators be true to validate  new value properties
    let task = await Task.findOneAndUpdate({ _id:req.params.id }, req.body, {new: true, runValidators: true})
    if (!task) {
        return next(createCustomAPIError(`No task with ID ${req.params.id}`, 404))
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper (async (req, res, next) => {
    let task = await Task.findOneAndDelete({ _id:req.params.id })
    if (!task) {
        return next(createCustomAPIError(`No task with ID ${req.params.id}`, 404))
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}
