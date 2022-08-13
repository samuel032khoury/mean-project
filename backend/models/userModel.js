const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        reqired: [true, 'Please add a name']
    },
    email: {
        type: String,
        reqired: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        reqired: [true, 'Please add a password']
    },
}, {
    timestamps:true
})

module.exports = mongoose.model('User', userSchema)