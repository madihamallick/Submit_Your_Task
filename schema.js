const mongoose = require('mongoose')

const schemaOfStudents = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    }
})

const Candidate = mongoose.model('candidate', schemaOfStudents)
module.exports = Candidate