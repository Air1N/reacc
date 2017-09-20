var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var port = process.env.PORT || 80;
var wowclicks = 0;
var angryclicks = 0;

var allClients = -1;

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/', express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    allClients++;
    var UserID = allClients;
    
    console.log('ID: ' + UserID + ' connected.');
    io.emit('userConnect', {
        UserID: UserID
    });
    
    socket.on('angryclick', function () {
      angryclicks++;
      
      fs.writeFile(__dirname + '/assets/clicks.txt', angryclicks + "\n" + wowclicks, function(err) {
        if(err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      });
      
      socket.broadcast.emit('angryclick');
    });
    
    socket.on('wowclick', function () {
      wowclicks++;
      
      fs.writeFile(__dirname + '/assets/clicks.txt', angryclicks + "\n" + wowclicks, function(err) {
        if(err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      });
      
      socket.broadcast.emit('wowclick');
    });
    
    socket.once('disconnect', function() {
        console.log('ID: ' + UserID + ' disconnected.');
        
        socket.broadcast.emit('userDisconnect', {
            UserID: UserID
        });
    });
});

http.listen(port, function() {
    console.log('listening on *:' + (port).toString());
});
