var long1 = new Audio("Music/long/q.mid");
var long2 = new Audio("Music/long/1.wav");
var long3 = new Audio("Music/long/q.wav");

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
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "52": kit1,
    "53": kit2,
    "54": kit9,
    "55": kit10,
    "8": 56,
    "9": 57,
    "65": fit8,
    "66": kit8,
    "c": 67,
    "d": 68,
    "e": 69,
    "70": kit5,
    "71": kit6,
    "h": 72,
    "i": 73,
    "j": 74,
    "k": 75,
    "l": 76,
    "m": 77,
    "n": 78,
    "o": 79,
    "p": 80,
    "q": 81,
    "82": kit3,
    "s": 83,
    "84": kit4,
    "85": kit12,
    "86": kit7,
    "w": 87,
    "x": 88,
    "89": kit11,
    "z": 90,
    ";": 186,
    "=": 187,
    ",": 188,
    "-": 189,
    ".": 190,
    "/": 191,
    "`": 192,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222
};
window.onload = function() {
    window.onkeyup = function(e) {
        keys[e.keyCode].stop();
    	keys[e.keyCode].play();
    };

    document.getElementById("four").onmousedown = function() {
        kit1.stop();
        kit1.play();
    }
    document.getElementById("five").onmousedown = function() {
        kit2.stop();
        kit2.play();
    }
    document.getElementById("r").onmousedown = function() {
        kit3.stop();
        kit3.play();
    }
    document.getElementById("t").onmousedown = function() {
        kit4.stop();
        kit4.play();
    }
    document.getElementById("f").onmousedown = function() {
        kit5.stop();
        kit5.play();
    }
    document.getElementById("g").onmousedown = function() {
        kit6.stop();
        kit6.play();
    }
    document.getElementById("v").onmousedown = function() {
        kit7.stop();
        kit7.play();
    }
    document.getElementById("b").onmousedown = function() {
        kit8.stop();
        kit8.play();
    }
    document.getElementById("six").onmousedown = function() {
        kit9.stop();
        kit9.play();
    }
    document.getElementById("seven").onmousedown = function() {
        kit10.stop();
        kit10.play();
    }
    document.getElementById("y").onmousedown = function() {
        kit11.stop();
        kit11.play();
    }
    document.getElementById("u").onmousedown = function() {
        kit12.stop();
        kit12.play();
    }
}

HTMLAudioElement.prototype.stop = function()
{
	this.pause();
	this.currentTime = 0.0;
}
