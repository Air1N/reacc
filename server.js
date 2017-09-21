var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var port = process.env.PORT || 80;

var allClients = -1;

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/', express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var wowclicks = 0;
var angryclicks = 0;

//var wowup = [0, 0, 0];

writeFile();

function loadFiles() {
  fs.readFile(__dirname + '/assets/clicks.txt', 'utf8', function(err, data){
    if(err){
      console.log(err);
    }
    
    data = data.split('\n');
    
    io.emit('loadFile', data);
  });
}

function writeFile() {
  fs.writeFile(__dirname + '/assets/clicks.txt', angryclicks + "\n" + wowclicks/* + "\n" + wowup[0] + "\n" + wowup[1] + "\n" + wowup[2]*/, function(err) {
        if(err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      });
}

io.on('connection', function(socket) {
    allClients++;
    var UserID = allClients;
    
    loadFiles();
    
    console.log('ID: ' + UserID + ' connected.');
    io.emit('userConnect', {
        UserID: UserID
    });
    
    socket.on('angryclick', function () {
      angryclicks++;
      
      writeFile();
      
      socket.broadcast.emit('angryclick');
    });
    
    socket.on('wowclick', function () {
      wowclicks++;
      
      writeFile();
      
      socket.broadcast.emit('wowclick');
    });
    
    socket.on('wowup1', function () {
      wowup[0]++;
      
      writeFile();
      
      socket.broadcast.emit('wowup1');
    });
    
    socket.on('wowup2', function () {
      wowup[1]++;
      
      writeFile();
      
      socket.broadcast.emit('wowup2');
    });
    
    socket.on('wowup3', function () {
      wowup[2]++;
      
      writeFile();
      
      socket.broadcast.emit('wowup3');
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
