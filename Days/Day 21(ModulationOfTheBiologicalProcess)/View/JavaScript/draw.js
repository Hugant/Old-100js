var grass1 = document.getElementById("grass1");
var grass2 = document.getElementById("grass2");
var tree1 = document.getElementById("tree1");
var tree2 = document.getElementById("tree2");
var rabbitM = document.getElementById("rabbitM");
var rabbitW = document.getElementById("rabbitW");
var volfM = document.getElementById("volfM");
var volfW = document.getElementById("volfW");
var hungry = document.getElementById("hungry");
var inLove = document.getElementById("inLove");
var death = document.getElementById("death");

var draw = {
    map: function() {
        var xMap = 0;
    	var yMap = 0;
    	for(var i = 0; i < ROWS; i++) {
    		for(var j = 0; j < COLS; j++) {
    			switch(BackMap[i][j]) {
    				case 1:
    					context.drawImage(grass1, xMap, yMap);
    					break;

    				case 2:
    					context.drawImage(grass2, xMap, yMap);
    					break;

    				case 3:
    					context.drawImage(tree1, xMap, yMap);
    					break;

    				case 4:
    					context.drawImage(tree2, xMap, yMap);
    					break;
    			}
    			xMap += 48;
    		}
    		yMap += 48;
    		xMap = 0;
    	}
    },

    actors: function() {
        for (var actor in Actors) {
            if(actor != null) {
                context.drawImage(Actors[actor].image, Actors[actor].x * 48, Actors[actor].y * 48);

                if(actor.hungry == 1) {
                    context.drawImage(hungry, Actors[actor].x * 48, Actors[actor].y * 48 + 1);
                }

                if(actor.inLove == 1) {
                    context.drawImage(inLove, Actors[actor].x * 48 + 30, Actors[actor].y * 48 + 4);
                }
            }
        }
    },

    place: function(x, y) {
    	switch(BackMap[y][x]) {
    		case 1:
    			context.drawImage(grass1, 48 * x, 48 * y);
    			break;

    		case 2:
    			context.drawImage(grass2, 48 * x, 48 * y);
    			break;
    	}
    },

	actor: function(actor) {

        context.drawImage(actor.image, actor.x * 48, actor.y * 48);

		if(actor.hungry == 1) {
			context.drawImage(hungry, actor.x * 48, actor.y * 48 + 1);
		}

		if(actor.inLove == 1) {
			context.drawImage(inLove, actor.x * 48 + 30, actor.y * 48 + 4);
		}
	},

    step: function(actor, dir) {
        var personX = actor.x;
    	var personY = actor.y;
    	var futureX = dir.x + actor.x;
    	var futureY = dir.y + actor.y;

    	var dx = 48 * actor.x;
    	var dy = 48 * actor.y;

    	var intervalID = setInterval( function(){
    		draw.place(personX, personY);
    		draw.place(futureX, futureY);

    		if(dir.x > 0)
    			dx += 1;
    		else if(dir.x < 0)
    			dx -= 1;
    		else if(dir.y > 0)
    			dy += 1;
    		else if(dir.y < 0)
    			dy -= 1;

            context.drawImage(actor.image, dx, dy);

    		if(futureX != personX) {
    			if(dx / 48 == futureX)
    				clearInterval(intervalID);
            } else {
    			if(dy / 48 == futureY)
    				clearInterval(intervalID);
    		}
    	}, 10);
    },

    attackStep: function(actor, dir) {
        var personX = actor.x;
    	var personY = actor.y;
    	var futureX = dir.x + actor.x;
    	var futureY = dir.y + actor.y;
    	var sub = 0;
    	var i = 0;

    	var dx = 48 * actor.x;
    	var dy = 48 * actor.y;

    	var intervalID = setInterval( function() {
    		draw.place(personX, personY);
    		draw.place(futureX, futureY);

    		if(!sub) {
    			if(dir.x > 0)
    				dx += 1;
    			else if(dir.x < 0)
    				dx -= 1;
    			else if(dir.y > 0)
    				dy += 1;
    			else if(dir.y < 0)
    				dy -= 1;
    		} else {
    			if(dir.x > 0)
    				dx -= 1;
    			else if(dir.x < 0)
    				dx += 1;
    			else if(dir.y > 0)
    				dy -= 1;
    			else if(dir.y < 0)
    				dy += 1;
    		}

            draw.actor(Actors[futureX + "_" + futureY]);

    		if(futureX != personX){
    			if(i == 24)
    				sub = 1;

    			if(dx == personX * 48)
    				clearInterval(intervalID);
    		} else {
    			if(i == 24)
    				sub = 1;

    			if(dy == personY * 48)
    				clearInterval(intervalID);
    		}
    		i++;
    	}, 10);
    }
}
