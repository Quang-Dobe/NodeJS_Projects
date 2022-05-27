const jobData = require('../model/jobData')
const {StatusCodes} = require('http-status-codes')
const {notFoundError, badRequestError, unAuthorizationError} = require('../error')

const getAllJob = async (req, res, next) => {
    // Get all job which has CreatedBy-Property same as req.user.userID
    let jobs = await jobData.find({ createdBy:req.user.userID }).sort('createdAt').select('company position status')
    res.status(StatusCodes.OK).json({ "Message":jobs })
}

const getSingleJob = async (req, res, next) => {
    let job = await jobData.findOne({ createdBy:req.user.userID, _id:req.params.id })
    if (!job) {
        throw new notFoundError("Not found this job")
    }
    res.status(StatusCodes.OK).json({ "Message":job })
}

const createSingleJob = async (req, res, next) => {
    // Remember, when we use SchemaModel.create(), mongoose will automatically add _id-property
    req.body.createdBy = req.user.userID
    let job = await jobData.findOne( req.body )
    if (job) {
        throw new badRequestError("This job already exists in database!")
    }
    job = await jobData.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}

const updateSingleJob = async (req, res, next) => {
    if (req.body.company==='' || req.body.position==='') {
        throw new badRequestError("Please provide company and position!")
    }
    let temp_job = await jobData.findOne({ _id:req.params.id })
    // Check job exists or not
    if (!temp_job) {
        throw new notFoundError("Not found this job")
    }
    // Check user can modify this job or not (Based on req.user.userID)
    if (temp_job.createdBy!=req.user.userID) {
        throw new unAuthorizationError("You can't modify this job status")
    }
    // Update this job
    let job = await jobData.findOneAndUpdate({ _id:req.params.id, createdBy:req.user.userID }, req.body, {new:true, runValidators:true})
    res.status(StatusCodes.OK).json({ "Message":job })
}

const deleteSingleJob = async (req, res, next) => {
    let temp_job = await jobData.findOne({ _id:req.params.id })
    // Check job exists or not
    if (!temp_job) {
        throw new notFoundError("Not foung this job")
    }
    // Check user can delete this job or not (based on req.user.userID)
    if (temp_job.createdBy!=req.user.userID) {
        throw new unAuthorizationError("You can't modify this job status")
    }
    // Delete this job
    let job = await jobData.findOneAndDelete({ _id:req.params.id, createdBy:req.user.userID })
    res.status(StatusCodes.OK).json({ "Message":"Delete successfully!"})
}

module.exports = {
    getAllJob,
    getSingleJob,
    createSingleJob,
    updateSingleJob,
    deleteSingleJob
}