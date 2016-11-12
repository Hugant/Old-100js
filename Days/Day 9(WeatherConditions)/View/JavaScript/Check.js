var widthMain = c.width = window.innerWidth;
var heightMain = c.height = window.innerHeight;
var ctx = c.getContext('2d');

var accelleration = 0.1;

var size = 1;
var occupation = 1;
var repaintColor = 'rgba(0, 0, 0, 0.04)';
var dots = [];
var dotsVel = [];
var numberRaindrops = 0.00001;
var time = 0;
var deleteRain = 0;

function clear()
{
	ctx.fillStyle = "rgba(0, 154, 205, 1)";
	ctx.fillRect(0, 0, widthMain, heightMain);
}

function drawCircle(x, y, radius, color)
{
	ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCloud(x, y)
{
	drawCircle(x + 220, y + 110, 100, "#292929");
	drawCircle(x + 140, y + 70, 70, "#292929");
	drawCircle(x + 90, y + 150, 90, "#292929");
	drawCircle(x + 170, y + 210, 50, "#292929");
	drawCircle(x + 240, y + 190, 70, "#292929");
	drawCircle(x + 320, y + 140, 70, "#292929");
}

function createClouds()
{
	for(var i = 0; i < 5000; i += 830)
	{
		drawCloud(-50 + i, -70);
		drawCloud(230 + i, -90);
		drawCloud(470 + i, -120);
		drawCloud(490 + i, -60);
		drawCloud(790 + i, -100);
		drawCloud(830 + i, -70);
	}
}

function createRaindrops()
{
	for(var i = 0; i < widthMain; i++)
	{
		dots[i] = heightMain;
		dotsVel[i] = 10;
	}
}

function startDeleteRaindrops()
{
	time = 300;
}

function deleteRaindrops()
{
	time = 0;
	dots = [];
	dotsVel = [];
	numberRaindrops = 0.00001;
	deleteRain = 0;
}

function Rain()
{
	if(time === 0)
	{
		createRaindrops();
	}
	ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
	ctx.fillRect(0, 0, widthMain, heightMain);

	for(var i = 0; i < widthMain; i++)
	{
		var currentY = dots[i] - 1;
		dots[i] += dotsVel[i] += accelleration;

		ctx.fillStyle = "blue";
		ctx.fillRect(occupation * i, currentY, size, dotsVel[i] + 1);

		if(dots[i] > heightMain && Math.random() < numberRaindrops)
			dots[i] = dotsVel[i] = 0;
	}
	createClouds();

	if(time < 150)
		time++;
	else if(time > 150)
	{
		time--;
		if(time === 200)
		{
			if(numberRaindrops >= 0.00001)
			{
				numberRaindrops -= 0.0001;
				time = 300;
			}
			else
			{
				deleteRaindrops();
				setAnimation(Sun);
			}
		}
	}
	else if(time === 150)
	{
		if(numberRaindrops <= 0.01)
			numberRaindrops += 0.0001;
		time = 1;
	}
}

function drawSun(x, y, radius)
{
	ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffff00';
    ctx.fill();
}

function Sun()
{
	clear();
	drawSun(widthMain - 150, heightMain - (heightMain - 150), 100);
}

function onSun()
{
	if(!deleteRain)
	{
		deleteRain = 1;
		startDeleteRaindrops();
	}
}

function onRain()
{
	setAnimation(Rain);
}

var anim;
var count = 0;

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

var setAnimation = function(callback) {
	anim = callback;
};

var animationStep = function() {
	anim();
	requestAF(animationStep);
};

var animationStart = function(callback) {
	anim = callback;
	animationStep();
};

function animation()
{
	animationStart(Sun);
}

window.onload = function() {
	animation();
};
