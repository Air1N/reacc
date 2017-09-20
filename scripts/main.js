var socket = io();
var UserID = 0;

var wow = document.getElementById('wowbutton');
var angry = document.getElementById('angrybutton');

var angryclicks = 0;
var wowclicks = 0;

function update() {
  
}


socket.on('userConnect', function(data) {
    console.log(UserID);
    if (UserID == -1) UserID = data.UserID;
});

socket.on('wowclick', function() {
  wowclicks++;
});

socket.on('angryclick', function() {
  angryclicks++;
});

function angClick() {
  
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

wow.onmousedown = function (e) {
  io.emit('wowclick');
  
};

angry.onmousedown = function (e) {
  io.emit('angryclick');
};

setInterval(update, 1000 / 100);