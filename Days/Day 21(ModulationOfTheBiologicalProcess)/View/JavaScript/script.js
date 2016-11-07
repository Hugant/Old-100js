var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 480;

var ROWS = 10;
var COLS = 20;


var BackMap;
var ActorMap;
var actorCoords = {};
var actorList = [];

window.onload = function() {
    init.world();
}


function gameLoop() {
    
}
