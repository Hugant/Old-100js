var fit = new Audio("Music/1.wav");
var fit2 = new Audio("Music/2.wav");
var fit3 = new Audio("Music/3.wav");
var fit4 = new Audio("Music/3 (2).wav");
var fit5 = new Audio("Music/3 (3).wav");
var fit6 = new Audio("Music/3 (4).wav");
var fit7 = new Audio("Music/3 (5).wav");
var fit8 = new Audio("Music/3 (6).wav");
var voc = new Audio("Music/10.wav")

window.onload = function() {
    document.getElementById("q").onmousedown = function() {
        fit.play();
    }
    document.getElementById("w").onmousedown = function() {
        fit2.play();
    }
    document.getElementById("e").onmousedown = function() {
        fit3.play();
    }
    document.getElementById("a").onmousedown = function() {
        fit4.play();
    }
    document.getElementById("s").onmousedown = function() {
        fit5.play();
    }
    document.getElementById("d").onmousedown = function() {
        fit6.play();
    }
    document.getElementById("one").onmousedown = function() {
        fit7.play();
    }
    document.getElementById("two").onmousedown = function() {
        fit8.play();
    }

    setInterval(function() {
        if(isKeyDown("a")) {
            fit8.play();
        }
        if(isKeyDown("q")) { 
            voc.play();
        }
    }, 0);
}


var keys = {
    "tab": 9,
    "enter": 13,
    "shift": 16,
    "capslock": 20,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "a": 65,
    "b": 66,
    "c": 67,
    "d": 68,
    "e": 69,
    "f": 70,
    "g": 71,
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
    "r": 82,
    "s": 83,
    "t": 84,
    "u": 85,
    "v": 86,
    "w": 87,
    "x": 88,
    "y": 89,
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

var keyDown = 0;

var setKey = function(keyCode) {
	keyDown = keyCode;
};

var clearKey = function(keyCode) {
	keyDown = 0;
};

var isKeyDown = function(keyName) {
	return keyDown == keys[keyName];
};

window.onkeydown = function(e) {
	setKey(e.keyCode);
};

window.onkeyup = function(e) {
	clearKey(e.keyCode);
};
