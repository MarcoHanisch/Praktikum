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

var jwt_simple = require('jwt-simple')


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
                        var token = jwt.sign(user={username: user.name, isAdmin: user.isAdmin, id:user._id}, app.get('superSecret'), {
                            expiresIn: 300
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
        .get( function(req, res){
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
            User.findOne({name: req.body.name}, function(err, user){
                if(err) throw err;
                if(user) {
                    res.json({succes: false, message: 'User is already in use'});
                } else {
                    var user = new User
                    user.name = req.body.name
                    user.password = req.body.password
                    user.isAdmin = req.body.admin
                    user.save(function(err) {
                    if(err) 
                    res.send(err);
                    res.json(user)
                    })
                    }
                })
            
        });
      
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
            var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
            var decoded = jwt_simple.decode(token, app.get('superSecret'))
            var post = new Post();
            post.title = req.body.title;
            post.topics.name = req.body.topics;
            post.Username = req.decoded.username;
            post.save(function(err) {
                if(err) 
                res.send(err);
                res.json(post)
            })
        })

        .get( function(req, res) {
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
                else { Comment.find({"Post_id": req.params.post_id}, function(err, comments){
                if(err)
                res.send(err)
                res.json([post,comments])
            })}
               
            })
            
            
        })
        .put(function(req, res){
            Post.findById(req.params.post_id , function(err,post){
                var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.username == req.body.name){
                if (err)
                res.send(err)
                post.title = req.body.title
                post.topics.name = req.body.topics
                post.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'Post updated'})
            })} else res.json({message: 'wrong user'})
            })
        })

        .delete(function(req, res){
            var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
            var decoded = jwt_simple.decode(token, app.get('superSecret'))
            if(decoded.isAdmin = false)
            res.json({message: 'wrong authorization'})
            Post.remove({_id: req.params.post_id},
                function(err, post){
                if (err)
                res.send(err)
                res.json({message:'Succesfully deleted '})
            })
        })
        
router.route('/posts/:post_id/comments')
        .post(function(req, res) {
            var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
            var decoded = jwt_simple.decode(token, app.get('superSecret'))
            var comment = new Comment();
            comment.title = req.body.title;
            comment.content = req.body.content;
            comment.Post_id = req.params.post_id;
            comment.Username = req.decoded.username;
            comment.save(function(err) {
                if(err) 
                res.send(err);
                res.json(comment)
            })
        })
       

router.route('/comment/:comment_id')
         .put(function(req, res){
            Comment.findById(req.params.comment_id , function(err,comment){
                var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.username == req.body.name){
                if (err)
                res.send(err)
                comment.title = req.body.title
                comment.content = req.body.content
                comment.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'Comment updated'})
            })} else res.json({message: 'wrong user'})
            })
        })

        .delete(function(req, res){
            Comment.remove({_id: req.params.comment_id},
             function(err, comment){
                var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.isAdmin = false)
                res.json({message: 'wrong authorization'})
                if (err)
                res.send(err)
                res.json({message:'Succesfully deleted '})
            })
        })



router.route('/user/:user_id')
        .delete(function(req, res){
            var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
            var decoded = jwt_simple.decode(token, app.get('superSecret'))
            if(decoded.isAdmin = false ){
                res.json({message: 'wrong authorization'})
            } else {
            User.remove({_id: req.params.user_id}
            , function(err, user){
                if (err)
                res.send(err)
                res.json({message:'Succesfully deleted '})
            })}
        })

        .put( function(req, res){
            User.findById(req.params.user_id , function(err,user){
                var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.id == req.params.user_id){
                if (err)
                res.send(err)
                user.name = req.body.name
                user.password = req.body.password
                user.isAdmin = req.body.admin
                user.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'User updated'})
            })} else res.json({message: 'You could only edit your own user'})
            })
        })

        .get(function(req, res){
            User.find({_id: req.params.user_id},{_id:0, name:1, isAdmin:1}, function(err, user){
                if(err)
                res.send(err)
                res.json(user)
            })
        })

router.route('/user')
        .get( function(req, res) {
            User.find(/*{},{_id:0, name:1, isAdmin:1 },*/function(err, user) {
                if(err)
                res.send(err)
                res.json(user)
            })
        })


app.use('/api', router)
