var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostSchema = new Schema({
    title: String,
    comments: [{ content: String, User_id: String}],
    topics: [{ name: String }],
    User_id: String
})

module.exports = mongoose.model('Post', PostSchema)