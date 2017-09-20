var mouse = {
    down: {},
    up: {},
    current: {}
};

var activeKeys = [];


function keyEvents() {

}

window.onkeydown = function(e) {
    activeKeys.push(e.keyCode);
};

window.onkeyup = function(e) {
    var z = activeKeys.indexOf(e.keyCode);
    toggle = true;

    for (i = activeKeys.length; i > 0; i--) {
        if (z == -1) break;
        activeKeys.splice(z, 1);
        z = activeKeys.indexOf(e.keyCode);
    }

    moving = false;
};

function keyDown(key) {
    if (activeKeys.indexOf(key) > -1) return true;
    return false;
}

Array.prototype.getLast = function() {
    return this[this.length - 1];
};
