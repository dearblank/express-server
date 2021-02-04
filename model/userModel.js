var mongoose = require('mongoose')

module.exports = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    reg_time: Number
}))