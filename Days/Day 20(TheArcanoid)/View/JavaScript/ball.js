function Ball(radius, color) {
	this.centerY = player.coordY - radius;
	this.centerX = player.coordX + (player.width / 2);
	this.radius = radius;
	this.startingAngle = 0;
	this.endingAngle = 2 * Math.PI;
	this.color = color;
}