var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
    title: String,
    content: String,
    User_id: String,
    Post_id: String ,
})

module.exports = mongoose.model('Comment', CommentSchema)