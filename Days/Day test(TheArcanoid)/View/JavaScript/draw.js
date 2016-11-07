var draw = {
	map: function() {
		for(var i = 0; i < map.length; i++) {
			for(var j = 0; j < map[i].length; j++) {
				this.block(map[i][j], j, i);
			}
		}
	},
	
	player: function() {
		context.fillStyle = player.color;
		context.fillRect(player.coordX, player.coordY, player.width, player.height);
	},
	
	ball: function() {
		if(gameActive) {
			context.fillStyle = ball.color;
			context.arc(ball.centerX, ball.centerY, ball.radius, ball.startingAngle, ball.endingAngle);
			context.fill();
		} else {
			ball.centerX = player.coordX + (player.width / 2);
			context.fillStyle = ball.color;
			context.arc(ball.centerX, ball.centerY, ball.radius, ball.startingAngle, ball.endingAngle);
			context.fill();
		}
	},
	
	block: function(block, x, y) {
		context.fillStyle = block.color;
		context.fillRect(x * (block.width + 3) + 3, y * (block.height + 3) + 3, block.width, block.height);
	},
	
	clear: function() {
		canvas.width = canvas.width;
		//context.fillStyle = "black";
		//context.fillRect(0, 0, canvas.width, canvas.height);
	}
};