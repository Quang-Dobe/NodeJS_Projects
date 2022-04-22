const mongoose = require('mongoose')

// This is a simple table you defined to contain data.
// But if someone add data to this table, there is no required for each property, 
// So user may add or not add any value for each or all of properties
const TaskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
})
// Another type of table: In this table, when user want to add (insert) data into this table,
// they must give value for each properties which the required-statement is setted to be true
const taskSchema = new mongoose.Schema({
    name: {
        // Here, we will set all the condition for the req posting-database
        type: String,
        // required: true,
        required: [true, "Must provide name!"],
        trim: true,
        maxlength: [20, "Length of name property can't more than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// The 'Task' param is used as the name when we export this to another file
module.exports = mongoose.model('Task', taskSchema)