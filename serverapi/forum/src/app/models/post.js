var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostSchema = new Schema({
    title: String,
    topics: { description: String },
    Username: String,
    created: Date
})

module.exports = mongoose.model('Post', PostSchema)