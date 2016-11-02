var red = new Audio("JavaScript/sound/red.wav");
var orange = new Audio("JavaScript/sound/orange.wav");
var yellow = new Audio("JavaScript/sound/yellow.wav");
var green = new Audio("JavaScript/sound/green.wav");
var cyan= new Audio("JavaScript/sound/cyan.wav");
var blue = new Audio("JavaScript/sound/blue.wav");

function soundClick(button) 
{
	switch(button)
	{
		case "red":
			red.stop();
			red.play();
			break;
			
		case "orange":
			orange.stop();
			orange.play();
			break;
			
		case "yellow":
			yellow.stop();
			yellow.play();
			break;
			
		case "green":
			green.stop();
			green.play();
			break;
			
		case "cyan":
			cyan.stop();
			cyan.play();
			break;
			
		case "blue":
			blue.stop();
			blue.play();
			break;
	}
}

HTMLAudioElement.prototype.stop = function()
{
	this.pause();
	this.currentTime = 0.0;
}