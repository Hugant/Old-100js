var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.width = 734;
canvas.height = 480;

var ROWS = 14;
var COLS = 10;
var Fx = 0;
var Fy = 0;
var gameActive = 0;

var map = [ [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			[3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
			[3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
			[4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[4, 4, 4, 4, 4, 4, 4, 4, 4, 4] ];

var player = new Block(90, 20, "grey");
player.coordX = (canvas.width / 2) - (player.width / 2);
player.coordY = 450;

var ball = new Ball(10, "white");

var leftMargin = (window.innerWidth - (canvas.width)) / 2;

function main() {
	draw.clear();
	draw.map();
	moveBall();
	draw.ball();
	draw.player();
}

document.getElementById("body").onload = function() {
	init.map();
	main();
	engineStart(main);
};

canvas.onmousemove = function(event) {
	player.coordX = event.pageX - canvas.offsetLeft - (player.width / 2);
}

canvas.onmousedown = function() {
	if(!gameActive) {
		gameActive = 1;
		Fx = Math.random() > 0.5 ? Math.random() : -Math.random();
		Fy = -3;
	}
}

function moveBall() {
	if(gameActive) {
		ball.centerY += Fy;
		ball.centerX += Fx;
		checkObstacles();
		if(Fx < 0)
			Fx -= 0.001;
		else
			Fx += 0.001;
			
		if(Fy < 0)
			Fy -=  0.001;
		else
			Fy += 0.001;
	}
}

function checkObstacles() {
	if((ball.centerY + ball.radius >= canvas.height) || (ball.centerY - ball.radius <= 0)) {
		Fy = -Fy;
	}
	
	if((ball.centerX + ball.radius >= canvas.width) || (ball.centerX - ball.radius <= 0)) {
		Fx = -Fx;
	}
	
	for(var i = 0; i < map.length; i++) {
		for(var j = 0; j < map[i].length; j++) {
			if(map[i][j].coordX * (map[i][j].width + 3) + 3 == ball.centerX - ball.radius &&
			   map[i][j].coordY * (map[i][j].height + 3) + 3 == ball.centerY - ball.radius)
			   console.log("anegl");
			else 
			{
			if(map[i][j].coordX * (map[i][j].width + 3) + 3 <= ball.centerX - ball.radius &&
			   map[i][j].coordX * (map[i][j].width + 3) + 3 + map[i][j].width >= ball.centerX + ball.radius &&
			   map[i][j].coordY * (map[i][j].height + 3) + 3 <= ball.centerY - ball.radius && 
			   map[i][j].coordY * (map[i][j].height + 3) + 3 + map[i][j].height >= ball.centerY - ball.radius) {
			   console.log( map[i][j].coordY * (map[i][j].height + 3) + 3 + " == " + ball.centerX);
			   Fy = -Fy;
			}
			}
		}
	}
	
	if(player.coordX * (player.width + 3) + 3 <= ball.centerX - ball.radius &&
	   player.coordX * (player.width + 3) + 3 + player.width >= ball.centerX + ball.radius &&
	   player.coordY * (player.height + 3) + 3 <= ball.centerY - ball.radius && 
	   player.coordY * (player.height + 3) + 3 + player.height >= ball.centerY - ball.radius) {
			console.log( player.coordY * (player.height + 3) + 3 + " == " + ball.centerX);
			Fy = -Fy;
	}
}