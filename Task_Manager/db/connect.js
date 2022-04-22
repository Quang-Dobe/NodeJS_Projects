const mongoose = require('mongoose')

// const connectionString = "Link Database"

const connectDB = (url) => {
    // Instead of using param "connectionString", we put the link
    // in .env and in .gitignore, we keep .env as a secret file
    // So that if we push project to github, the "Link database" won't be pushed (link is stored in .env)
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
}

module.exports = connectDB


