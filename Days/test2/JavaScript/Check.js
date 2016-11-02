var context = document.getElementById("canvas").getContext("2d");
var position = document.getElementById("position");
var cursor = document.getElementById("cursor");

var x = 0;
var y = 0;
var interval;

function drawRect()
{
	context.fillStyle = "red";
	context.fillRect(x, y, 6, 6);
}

setInterval(function() {
	position.innerHTML = "Позиция курсора " + x + ":" + y;
	cursor.style.left = x - 3 + "px";
	cursor.style.top = y - 3 + "px";
}, 1000/60);

canvas.onmousemove = function(e) {
	x = e.pageX - 10;
	y = e.pageY - 10;
};

canvas.onmousedown = function() {
	interval = setInterval(function() { drawRect(); }, 0);
};

canvas.onmouseup = function() {
	clearInterval(interval);
};

drawRect()