var express = require('express')
var app = express()
var port = 8080

app.use(express.static('../test'));

app.get('/',(req, res) => {
    res.sendfile(__dirname+'/index.html')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happend',err)
    }

    console.log('server is listening')
})