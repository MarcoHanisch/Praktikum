var express = require('express')
var app = express()
var port = 8080
var mongoose = require('mongoose').set('debug', 'true')
var bodyParser = require('body-parser')
var router = express.Router()
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken')
var http = require('http')
var path = require('path')

mongoose.Promise = global.Promise;
mongoose.connect('localhost/ForumDatabase');

var fixtures = require('pow-mongodb-fixtures').connect('ForumDatabase');




//fixtures.clear(function(err) {
    //Drops the database
//});
fixtures.clear(function(err){
    if(err)
    res.send(err)
})
//Objects
/*fixtures.clearAllAndLoad({
    users: [
        { name: 'Admin', password: 'password', isAdmin: true },
        { name: 'Test', password: 'test', isAdmin:false }
    ],
    posts:[
        {title: 'Test', topics:{description: ['Test','Test2']} , Username: 'Test'},
        {title: 'Other Post', topics: 'topics', Username:'Admin'}
    ]
}, callback);*/

//Files
//fixtures.load(__dirname + '/fixtures/users.js', callback);

//Directories (loads all files in the directory)
fixtures.load(__dirname + '/fixtures');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.use(cookieParser());
app.set('superSecret', 'apitest')



var Post = require('./src/app/models/post')
var User = require('./src/app/models/user')
var Comment = require('./src/app/models/comment')

var jwt_simple = require('jwt-simple')


app.get('/',(req, res) => {
    res.sendFile(__dirname+'dist/index.html')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happend',err)
    }

    console.log('server is listening')
})

var server = http.createServer(app);

app.use('/api', router)

router.route('/test')
        .get(function(req,res) {
            res.send('api works')
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
                        }) 
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
            Post.distinct("topics.description", function(err, post){
                if(err)
                res.send(err)
                res.json(post)
            })
        })

router.route('/topics/:topicsname')
        .get(function(req, res) {
            Post.find({"topics.description": req.params.topicsname},/*{_id:0, title:1, topics:1} ,*/ function(err, post){
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
                    user.isAdmin = false
                    user.save(function(err) {
                    if(err) 
                    res.send(err);
                    res.json(user)
                    })
                    }
                })
            
        });

router.route('/posts')
        .get( function(req, res) {
            Post.find(function(err, posts) {
                if(err)
                res.send(err)
                res.json(posts)
            })
        })
      
router.use(function(req, res, next){
    var token = req.body.token || req.query.token ||req.headers['x-acces-token']||req.headers['Authorization:'];

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
            post.topics.description =  req.body.topics;
            post.Username = req.decoded.username;
            post.save(function(err) {
                if(err) 
                res.send(err);
                res.json(post)
            })
        })
router.route('/posts/:post_id/comments')
        .get(function (req, res) {
            Comment.find({"Post_id": req.params.post_id}, function(err, comments) {
                if(err)
                res.send(err)
                res.json(comments)
            })
        })
        

router.route('/posts/:post_id')
        .get(function(req, res) {
            Post.findById(req.params.post_id, function(err, post){
                if(err)
                res.send(err)
               // else { Comment.find({"Post_id": req.params.post_id}, function(err, comments){
               // if(err)
                //res.send(err)
                res.json(post)
            })}
               
       // }  )
            
            
       // }
        )
        .put(function(req, res){
            Post.findById(req.params.post_id , function(err,post){
                var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.username === post.Username){
                if (err)
                res.send(err)
                post.title = req.body.title
                post.topics.description = req.body.topics
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
            if(decoded.isAdmin == false){
            res.json({message: 'wrong authorization'})} else {
            Post.remove({_id: req.params.post_id},
                function(err, post){
                if (err){
                res.send(err)}
                else{ Comment.find({"Post_id": req.params.post_id}).remove(function(err){
                    if(err)
                    res.send(err)
                })
                res.json({message:'Succesfully deleted'})
            }})}
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
router.route('/comments')
        .get( function(req, res) {
            Comment.find(function(err, comments) {
                if(err)
                res.send(err)
                res.json(comments)
            })
        })      

router.route('/comment/:comment_id')
        /* .put(function(req, res){
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
        })*/

        .put(function(req,res){
            Comment.findOneAndUpdate({_id: req.params.comment_id},req.body,function(err,comment){
                res.send(comment)
            })
        })

        .delete(function(req, res){
            Comment.remove({_id: req.params.comment_id},
             function(err, comment){
                var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.isAdmin == false){
                res.json({message: 'wrong authorization'})} else{
                if (err)
                res.send(err)
                res.json({message:'Succesfully deleted'})
            }})
        })
        .get(function(req, res){
            Comment.find({_id: req.params.comment_id}, function(err, comment){
                if(err)
                res.send(err)
                res.json(comment)
            })
        })



router.route('/user/:user_id')
        .delete(function(req, res){
            var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
            var decoded = jwt_simple.decode(token, app.get('superSecret'))
            if(decoded.isAdmin == false ){
                res.json({message: 'wrong authorization'})
            } else {
            User.find({_id: req.params.user_id}).remove(
             function(err, user){
                if (err)
                res.send(err);
                res.json({message:'Succesfully deleted'})
            })}
        })

       /* .put( function(req, res){
           
                var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.isAdmin = false){
                    res.json({message: 'wrong authorization'})
                } else{
                User.find({_id: req.params.user_id}).update( function(err,user){
                if (err)
                res.send(err)
                var user = User
                user.name = req.body.name || user.name
                user.password = req.body.password ||user.password
                user.isAdmin = req.body.isAdmin || user.isAdmin
                user.save(function(err) {
                if(err) 
                res.send(err);
                res.json({message: 'User updated'})
            })} 
            )}
        })*/
        
        .put(function(req,res) {
             var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.isAdmin === true || decoded.id === req.params.user_id){
                    User.findOneAndUpdate({_id: req.params.user_id}, req.body, function(err, user){
                res.send(user)
            })
                } else{
                    res.json({message: 'wrong authorization'})
            
        }})
        

        .get(function(req, res){
            User.find({_id: req.params.user_id},/*{_id:0, name:1, isAdmin:1},*/ function(err, user){
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



