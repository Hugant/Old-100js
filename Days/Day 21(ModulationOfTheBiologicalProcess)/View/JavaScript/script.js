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
    context.drawImage(death, 0, 0);
    gameLoop();
}


function gameLoop() {
    engine = setInterval( function() {

    }, 100);
}

function canGo(actor, dir) {
	return actor.x + dir.x >= 0 &&
	actor.x + dir.x <= COLS - 1 &&
	actor.y + dir.y >= 0        &&
	actor.y + dir.y <= ROWS - 1 &&
	( BackMap[actor.y + dir.y][actor.x + dir.x] == 1 ||
	  BackMap[actor.y + dir.y][actor.x + dir.x] == 2 ||
	  BackMap[actor.y + dir.y][actor.x + dir.x] >= 5 );
}

function moveTo(actor, dir) {
    if(!canGor)
        return false;

    var newKey = (actor.x + dir.x) + "_" + (actor.y + dir.y);

    if(actorCoords[newKey] != null) {
        var victim = actorCoords[newKey];

        if(actor.name = "Rabbit") {
            
        } else if(actor.name = "Volf") {

        }
    }
}
