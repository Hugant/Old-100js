var init = {
	map: function() {
		if(arguments.length == 0) {
			for(var i = 0; i < map.length; i++) {
				for(var j = 0; j < map[i].length; j++) {
					switch(map[i][j]) {
						case 0:
							map[i][j] = new Block();
						case 1:
							map[i][j] = new Block("blue");
							break;
						
						case 2:
							map[i][j] = new Block("green");
							break;
							
						case 3:
							map[i][j] = new Block("yellow");
							break;
							
						case 4:
							map[i][j] = new Block("red");
							break;
					}
					
					map[i][j].coordX = j;
					map[i][j].coordY = i;
				}
			}
		} else {
			console.log("else");
		}
	}
};