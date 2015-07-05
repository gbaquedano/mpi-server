console.log('Server started...');
// Express y Socket.IO
var app = require('express')();
var serveStatic = require('serve-static')
var server = require('http').Server(app);
// Os
var io = require('socket.io')(server);
var os = require('os');

io.on('connection',function(d){
        console.log('Test:' + d);
        d.on('test',function(r){
                console.log('Event test' + r);
        });
});

server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use('/scripts',serveStatic(__dirname + '/scripts'))
app.use('/css',serveStatic(__dirname + '/css'))
app.use('/fonts',serveStatic(__dirname + '/fonts'))
app.use('/img',serveStatic(__dirname + '/img'))