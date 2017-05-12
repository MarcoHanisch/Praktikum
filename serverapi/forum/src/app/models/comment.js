var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
    title: String,
    content: String,
    Username: String,
    Post_id: String ,
})

module.exports = mongoose.model('Comment', CommentSchema)