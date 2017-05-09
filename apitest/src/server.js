var express = require('express')
var app = express()
var port = 8080
var mongoose = require('mongoose').set('debug', 'true')
var bodyParser = require('body-parser')
var router = express.Router()
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken')

app.use(express.static('../test'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.set('superSecret', 'apitest')

mongoose.Promise = global.Promise;
mongoose.connect('localhost/ForumDatabase');

var Post = require('./app/models/post')
var User = require('./app/models/user')
var Comment = require('./app/models/comment')

app.get('/',(req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happend',err)
    }

    console.log('server is listening')
})

router.route('/authenticate')
        .post(function(req, res){
            User.findOne({name: req.body.name}, function(err, user){
                if(err) throw err;
                if(!user) {
                    res.json({succes: false, message: 'User not found'});
                } else if(user) {
                    if (user.password != req.body.password){
                        res.json({succes: false, message: 'Wrong password'});
                    }else {
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresIn: 60000
                        });
                        res.json({
                            succes: true,
                            message: 'Enjoy your token',
                            token: token
                        });
                    }
                }
            });
        });

router.route('/topics')
        .get(/*isLoggedIn,*/ function(req, res){
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

router.route('/user')
        .post(function(req, res) {
            var user = new User();
            user.name = req.body.name
            user.password = req.body.password
            user.isAdmin = req.body.admin
            user.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'User created'})
            })
        })
        
router.use(function(req, res, next){
    var token = req.body.token || req.query.token ||req.headers['x-acces-token'];

    if (token){

        jwt.verify(token, app.get('superSecret'), function(err, decoded){
            if (err) {
                return res.json({succes: false, message: 'Failed to authenticate'});
            }else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            succes: false,
            message: 'no token provided'
        });
    }
});



router.route('/posts')
        .post(function(req, res) {
            var post = new Post();
            post.title = req.body.title;
            post.topics.name = req.body.name;
            post.comments.content = req.body.content;
            post.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'Post created'})
            })
        })

        .get(function(req, res) {
            Post.find(function(err, posts) {
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
                post.title = req.body.title
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
        
router.route('/posts/:post_id/comments')
        .post(function(req, res) {
            var comment = new Comment();
           comment.title = req.body.title;
            comment.content = req.body.content;
            comment.Post_id = req.params.post_id;
            comment.save(function(err) {
                if(err) 
                res.send(err);
                res.json(comment)
            })
        })
        .get(function(req, res){
            Comment.find({"Post_id": req.params.post_id}, function(err, comments){
                if(err)
                res.send(err)
                res.json(comments)
            })
        })

router.route('/comment/:comment_id')
         .put(function(req, res){
            Comment.findById(req.params.comment_id , function(err,comment){
                if (err)
                res.send(err)
                comment.title = req.body.title
                comment.content = req.body.content
                comment.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'Comment updated'})
            })
            })
        })

        .delete(function(req, res){
            Comment.remove({_id: req.params.comment_id},
             function(err, comment){
                if (err)
                res.send(err)
                res.json({message:'Succesfully deleted '})
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

router.route('/user')
        .get(function(req, res) {
            User.find(function(err, user) {
                if(err)
                res.send(err)
                res.json(user)
            })
        })



app.use('/api', router)