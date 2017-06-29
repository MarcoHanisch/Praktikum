var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: String,
    password: String,
    isAdmin: Boolean,
   //roles: [String],
    firstname: String,
    lastname: String,
    birthday: String,
    street: String,
    number: String,
    town: String,
    ZIP: String,
    country: String
})

module.exports = mongoose.model('User', UserSchema)

