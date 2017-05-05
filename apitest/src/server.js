var express = require('express')
var app = express()
var port = 8080
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var router = express.Router()

app.use(express.static('../test'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('localhost/ForumDatabase');

var Post = require('./app/models/post')
var User = require('./app/models/user')

app.get('/',(req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happend',err)
    }

    console.log('server is listening')
})

router.route('/topics')
        .get(function(req, res){
            Post.distinct("topics.name", function(err, post){
                if(err)
                res.send(err)
                res.json(post)
            })
        })

router.route('/topics/:topicsname')
        .get(function(req, res) {
            Post.find({"topics.name": req.params.topicsname},{_id:0, title:1, topics:1} , function(err, post){
                if(err)
                res.send(err)
                res.json(post)
            })
        })

router.route('/posts')
        .post(function(req, res) {
            var post = new Post();
            post.title = req.body.title;
            post.topics.name = req.body.name;
            post.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'Post created'})
            })
        })

        .get(function(req, res) {
            Post.find({}, {_id:0, title:1, User_id:1},function(err, posts) {
                if(err)
                res.send(err)
                res.json(posts)
            })
        })

router.route('/posts/:post_id')
        .get(function(req, res) {
            Post.findById(req.params.post_id, function(err, post){
                if(err)
                res.send(err)
                res.json(post)
            })
        })
        .put(function(req, res){
            Post.findById(req.params.post_id , function(err,post){
                if (err)
                res.send(err)
                post.title = req.body.title,
                post.topics.name = req.body.name
                post.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'Post updated'})
            })
            })
        })

        .delete(function(req, res){
            Post.remove({_id: req.params.post_id},
             function(err, post){
                if (err)
                res.send(err)
                res.json({message:'Succesfully deleted '})
            })
        })
        .post(function(req, res){
            Post.findById(req.params.post_id, function(err, post){
                if(err)
                res.send(err)
                post.comments.content = req.body.content
                post.save(function(err){
                    if(err)
                    res.send(err);
                    res.json(post)
                })
            })
        })


router.route('/user')
        .post(function(req, res) {
            var user = new User();
            user.name = req.body.name
            user.password = req.body.password
            user.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'User created'})
            })
        })
        .get(function(req, res) {
            User.find(function(err, user) {
                if(err)
                res.send(err)
                res.json(user)
            })
        })

router.route('/user/:user_id')
        .delete(function(req, res){
            User.remove({_id: req.params.user_id}
            , function(err, user){
                if (err)
                res.send(err)
                res.json({message:'Succesfully deleted '})
            })
        })
        .put(function(req, res){
            User.findById(req.params.user_id , function(err,user){
                if (err)
                res.send(err)
                user.name = req.body.name
                user.password = req.body.password

                user.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'User updated'})
            })
            })
        })


app.use('/api', router)