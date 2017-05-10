var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostSchema = new Schema({
    title: String,
    topics: { name: String },
    Username: String
})

module.exports = mongoose.model('Post', PostSchema)