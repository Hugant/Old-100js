var context = document.getElementById("canvas").getContext("2d");
var image = document.getElementById("image");

var gameEngine;
var i = 1;
var x = 0;
var y = 0;

function drawFon(color)
{
	context.fillStyle = color;
	context.clearRect(0, 0, 1000, 1000);
	context.fillRect(0, 0, 1000, 1000);
}

function drawPig(frame, speedX, speedY)
{
	x += speedX;
	y += speedY;
	image.onload = function() {
		switch(frame)
		{
			case 1:
				context.drawImage(image, 10, 0, 70, 87, x, y, 70, 87);
				break;
			
			case 2:
				context.drawImage(image, 84, 0, 70, 87, x, y, 70, 87);
				break;
				
			case 3:
				context.drawImage(image, 158, 0, 80, 87, x, y, 80, 87);
				break;
				
			case 4:
				context.drawImage(image, 245, 0, 90, 87, x, y, 90, 87);
				break;
		}
		image.style.display = "none";
	};
	image.src = "Images/pig.png";
}

var requestAF = (function() {
	return requestAnimationFrame       ||
		   webkitRequestAnimationFrame ||
		   mozRequestAnimationFrame    ||
		   oRequestAnimationFrame      ||
		   msRequestAnimationFrame     ||
		   function(callback) {
			   setTimeout(callback, 1000 / 60);
		   };
})();

var gameEngineStart = function(callback) {
	gameEngine = callback;
	gameEngineStep();
};

var gameEngineStep = function() {
	gameEngine();
	requestAF(gameEngineStep);
};

var setGameEngine = function(callback) {
	gameEngine = callback;
};

var engine = function() {	
	
	if(isKeyDown("D"))
	{
		drawPig(i, 5, 0);
		if(i >= 4)
			i = 1;
		else
			i++;
	}
	
	if(isKeyDown("S"))
	{
		drawPig(i, 0, 5);
		if(i >= 4)
			i = 1;
		else
			i++;
	}
	
	if(isKeyDown("A"))
	{
		drawPig(i, -5, 0);
		if(i >= 4)
			i = 1;
		else
			i++;
	}
	
	if(isKeyDown("W"))
	{
		drawPig(i, 0, -5);
		if(i >= 4)
			i = 1;
		else
			i++;
	}
};

var keys = {
	"W": 87,
	"S": 83,
	"A": 65,
	"D": 68
};

var keyDown = {};

var setKey = function(keyCode) {
	keyDown[keyCode] = true;
};

var clearKey = function(keyCode) {
	keyDown[keyCode] = false;
};

var isKeyDown = function(keyName) {
	return keyDown[keys[keyName]] == true;
};

window.onload = function() {
	window.onkeydown = function(e) {
		setKey(e.keyCode);
	};
	
	window.onkeyup = function(e) {
		clearKey(e.keyCode);
	};
	gameEngineStart(engine);
};

/*
drawFon("#008080");
drawPig(1, 0, 0);

setInterval(function() {
	if(isKeyDown("D"))
	{
		drawFon("#008080");
		drawPig(i, 10, 0);
		if(i >= 4)
			i = 1;
		else
			i++;
	}
	
	if(isKeyDown("S"))
	{
		drawFon("#008080");
		drawPig(i, 0, 10);
		if(i >= 4)
			i = 1;
		else
			i++;
	}
	
	if(isKeyDown("A"))
	{
		drawFon("#008080");
		drawPig(i, -10, 0);
		if(i >= 4)
			i = 1;
		else
			i++;
	}
	
	if(isKeyDown("W"))
	{
		drawFon("#008080");
		drawPig(i, 0, -10);
		if(i >= 4)
			i = 1;
		else
			i++;
	}
}, 150);*/