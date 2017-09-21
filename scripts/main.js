var socket = io();
var UserID = 0;

var wow = document.getElementById('wowbutton');

/*
var wowup = [0, 0, 0];

var wowup1 = document.getElementById('wowup1');
var wowup2 = document.getElementById('wowup2');
var wowup3 = document.getElementById('wowup3');
*/

var wowsounds = [];
var wowSoundsNum = 5;
for (let i = 0; i < wowSoundsNum; i++) {
  wowsounds.push('assets/wow' + i + '.mp3');
}

var angrysounds = [];
var angrySoundsNum = 5;
for (let i = 0; i < angrySoundsNum; i++) {
  angrysounds.push('assets/angry' + i + '.mp3');
}





var angry = document.getElementById('angrybutton');

var angryclicks = 0;
var wowclicks = 0;

function wowsound() {
  var rand = Math.floor(Math.random() * wowsounds.length);
  var aud = new Audio(wowsounds[rand]);
  aud.volume = 1;
  aud.play();
}

function angrysound() {
  var rand = Math.floor(Math.random() * angrysounds.length);
  var aud = new Audio(angrysounds[rand]);
  aud.volume = 0.3;
  aud.play();
}


socket.on('loadFile', function(data) {
  angryclicks = data[0];
  wowclicks = data[1];
  
  /*
  wowup[0] = data[2];
  wowup[1] = data[3];
  wowup[2] = data[4];
  */
  
  update();
});

function update() {
  document.getElementById('wowtext').innerHTML = wowclicks;
  document.getElementById('angrytext').innerHTML = angryclicks;
  
  /*
  document.getElementById('wowup1text').innerHTML = wowup[0];
  document.getElementById('wowup2text').innerHTML = wowup[1];
  document.getElementById('wowup3text').innerHTML = wowup[2];
  */
}

socket.on('userConnect', function(data) {
    console.log(UserID);
    if (UserID == -1) UserID = data.UserID;
});

socket.on('wowclick', function() {
  wowclicks++;
  wowsound();
  
  update();
});

socket.on('angryclick', function() {
  angryclicks++;
  angrysound();
  
  update();
});

/*
socket.on('wowup1', function() {
  wowup[0]++;
  update();
});
socket.on('wowup2', function() {
  wowup[1]++;
  update();
});

socket.on('wowup3', function() {
  wowup[2]++;
  update();
});
*/

wow.onmousedown = function (e) {
  wowclicks++;
  wowsound();
  socket.emit('wowclick', {});
  
  update();
};

angry.onmousedown = function (e) {
  angryclicks++;
  angrysound();
  socket.emit('angryclick', {});
  
  update();
};

/*
wowup1.onmousedown = function () {
  wowup[0]++;
  socket.emit('wowup1', {});
  
  update();
};

wowup2.onmousedown = function () {
  wowup[1]++;
  socket.emit('wowup2', {});
  
  update();
};

wowup3.onmousedown = function () {
  wowup[2]++;
  socket.emit('wowup3', {});
  
  update();
};*/