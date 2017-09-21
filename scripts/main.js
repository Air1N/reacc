var socket = io();
var UserID = 0;

var wow = document.getElementById('wowbutton');
var angry = document.getElementById('angrybutton');

var angryclicks = 0;
var wowclicks = 0;

socket.on('loadFile', function(data) {
  angryclicks = data[0];
  wowclicks = data[1];
  
  update();
});

function update() {
  document.getElementById('wowtext').innerHTML = wowclicks;
  document.getElementById('angrytext').innerHTML = angryclicks;
}

socket.on('userConnect', function(data) {
    console.log(UserID);
    if (UserID == -1) UserID = data.UserID;
});

socket.on('wowclick', function() {
  wowclicks++;
  update();
});

socket.on('angryclick', function() {
  angryclicks++;
  update();
});

wow.onmousedown = function (e) {
  wowclicks++;
  socket.emit('wowclick', {});
  
  update();
};

angry.onmousedown = function (e) {
  angryclicks++;
  socket.emit('angryclick', {});
  
  update();
};