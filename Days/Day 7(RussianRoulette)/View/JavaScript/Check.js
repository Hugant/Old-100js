var count = 0;
var shot = new Audio("JavaScript/sound/shot.mp3");
var notShot = new Audio("JavaScript/sound/notShot.mp3");

var bang = function() {
	if(!count)
	{
		var random = Math.round(Math.random() * 6 + 1);
		if(random == 1)
		{
			count = 1;
			shot.stop();
			shot.play();
			document.getElementById("bangImg").style.display = "block";
			
		}
		else
		{
			notShot.stop();
			notShot.play();
		}
	}
	else
	{
		count = 0;
		document.getElementById("bangImg").style.display = "none";
	}
}

HTMLAudioElement.prototype.stop = function()
{
	this.pause();
	this.currentTime = 0.0;
}