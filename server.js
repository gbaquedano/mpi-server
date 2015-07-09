console.log('Server started...');
// Express y Socket.IO
var app = require('express')();
var serveStatic = require('serve-static')
var server = require('http').Server(app);
// Os
var io = require('socket.io')(server);
var os = require('os');

io.on('connection',function(socket){
        console.log('Conexión establecida:' + socket);
        socket.on('sensordata',function(r){
                console.log('New sensor data:' + r);
                io.emit('sensordata', r);
        });
});

var currLat = 42.455204;
var currLon = -2.454772;
setInterval(function(){
	io.emit('sensordata', 
	{
		lat: currLat,
		lon: currLon
	});
	currLat += 0.00001;
	currLon += 0.00001;
},250);

server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use('/scripts',serveStatic(__dirname + '/scripts'))
app.use('/css',serveStatic(__dirname + '/css'))
app.use('/fonts',serveStatic(__dirname + '/fonts'))
app.use('/img',serveStatic(__dirname + '/img'))






