const mongoose = require('mongoose')

const jobData = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Must provide name of company"],
        maxLength: 20
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'userData',
        required: [true, "Please provide user"]
    }
}, 
    // CreatedAt and UpdatedAt properties will be added automaticly
    {timestamps:true}
)

module.exports = mongoose.model('jobData', jobData)