var long1 = new Audio("Music/long/tilda.wav");
var long2 = new Audio("Music/long/1.wav");
var long3 = new Audio("Music/long/q.wav");
var long4 = new Audio("Music/long/a.wav");
var long5 = new Audio("Music/long/z.wav");
var long6 = new Audio("Music/long/0.wav");
var long7 = new Audio("Music/long/p.wav");
var long8 = new Audio("Music/long/semicolon.wav");
var long9 = new Audio("Music/long/dot.wav");
var long10 = new Audio("Music/long/dash.wav");

var kit1 = new Audio("Music/kits/4.wav");
var kit2 = new Audio("Music/kits/5.wav");
var kit3 = new Audio("Music/kits/r.wav");
var kit4 = new Audio("Music/kits/t.wav");
var kit5 = new Audio("Music/kits/f.wav");
var kit6 = new Audio("Music/kits/g.wav");
var kit7 = new Audio("Music/kits/v.wav");
var kit8 = new Audio("Music/kits/b.wav");
var kit9 = new Audio("Music/kits/6.wav");
var kit10 = new Audio("Music/kits/7.wav");
var kit11 = new Audio("Music/kits/y.wav");
var kit12 = new Audio("Music/kits/u.wav");
var kit13 = new Audio("Music/kits/h.wav");
var kit14 = new Audio("Music/kits/j.wav");
var kit15 = new Audio("Music/kits/n.wav");
var kit16 = new Audio("Music/kits/m.wav");



var fit4 = new Audio("Music/3 (2).wav");
var fit5 = new Audio("Music/3 (3).wav");
var fit6 = new Audio("Music/3 (4).wav");
var fit7 = new Audio("Music/3 (5).wav");
var fit8 = new Audio("Music/3 (6).wav");
var voc = new Audio("Music/10.wav")


var keys = {
    "tab": 9,
    "enter": 13,
    "shift": 16,
    "capslock": 20,
    "48": long6,
    "49": long2,
    "2": 50,
    "3": 51,
    "52": kit1,
    "53": kit2,
    "54": kit9,
    "55": kit10,
    "8": 56,
    "9": 57,
    "65": long4,
    "66": kit8,
    "c": 67,
    "d": 68,
    "e": 69,
    "70": kit5,
    "71": kit6,
    "72": kit13,
    "i": 73,
    "74": kit14,
    "k": 75,
    "l": 76,
    "77": kit16,
    "78": kit15,
    "o": 79,
    "80": long7,
    "81": long3,
    "82": kit3,
    "s": 83,
    "84": kit4,
    "85": kit12,
    "86": kit7,
    "w": 87,
    "x": 88,
    "89": kit11,
    "90": long5,
    "186": long8,
    "=": 187,
    ",": 188,
    "189": long10,
    ".": 123,
    "191": long9,
    "192": long1,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222
};
window.onload = function() {
    window.onkeyup = function(e) {
        keys[e.keyCode].stop();
    	keys[e.keyCode].play();
        document.getElementById("" + e.key.toLowerCase()).style.opacity = "1";
    };

    window.onkeydown = function(e) {
        document.getElementById("" + e.key.toLowerCase()).style.opacity = "0.60";
    }
}

function getKeyCode(key) {
    switch(key) {
        case 1:
    }
}

HTMLAudioElement.prototype.stop = function()
{
	this.pause();
	this.currentTime = 0.0;
}
