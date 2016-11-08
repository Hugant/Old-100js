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
    	for(var i = 0; i < ROWS; i++)
    	{
    		for(var j = 0; j < COLS; j++)
    		{
    			switch(BackMap[i][j])
    			{
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
        var xMap = 0;
    	var yMap = 0;
    	for(var i = 0; i < ROWS; i++)
    	{
    		for(var j = 0; j < COLS; j++)
    		{
    			switch(ActorMap[i][j])
    			{
    				case 1:
    					context.drawImage(rabbitM, xMap, yMap);
    					break;

    				case 2:
    					context.drawImage(rabbitW, xMap, yMap);
    					break;

                    case 3:
    					context.drawImage(volfM, xMap, yMap);
    					break;

    				case 4:
    					context.drawImage(volfW, xMap, yMap);
    					break;
    			}

                if(actorCoords[j + "_" + i] != undefined && actorCoords[j + "_" + i].hungry == 1)
                {
                    context.drawImage(hungry, xMap, yMap + 1);
                }

                if(actorCoords[j + "_" + i] != undefined && actorCoords[j + "_" + i].inLove == 1)
                {
                    context.drawImage(inLove, xMap + 30, yMap + 4);
                }
    			xMap += 48;
    		}
    		yMap += 48;
    		xMap = 0;
    	}
    },

    place: function(x, y) {
        var xMap = 48 * x;
    	var yMap = 48 * y;
    	switch(BackMap[y][x])
    	{
    		case 1:
    			context.drawImage(grass1I, xMap, yMap);
    			break;

    		case 2:
    			context.drawImage(grass2I, xMap, yMap);
    			break;

    		/*case 3:
    			context.drawImage(tree1I, xMap, yMap);
    			break;

    		case 4:
    			context.drawImage(tree2I, xMap, yMap);
    			break;*/
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

    		switch(ActorMap[actor.y][actor.x])
    		{
                case 1:
                    context.drawImage(rabbitM, dx, dy);
                    break;

                case 2:
                    context.drawImage(rabbitW, dx, dy);
                    break;

                case 3:
                    context.drawImage(volfM, dx, dy);
                    break;

                case 4:
                    context.drawImage(volfW, dx, dy);
                    break;
    		}

            if(actorCoords[actor.x + "_" + actor.y] != undefined && actorCoords[j + "_" + i].hungry == 1)
            {
                context.drawImage(hungry, xMap, yMap + 1);
            }

            if(actorCoords[actor.x + "_" + actor.y] != undefined && actorCoords[j + "_" + i].inLove == 1)
            {
                context.drawImage(inLove, xMap + 30, yMap + 4);
            }

    		if(futureX != personX)
    		{
    			if(dx / 48 === futureX)
    				clearInterval(intervalID);
    		}
    		else
    		{
    			if(dy / 48 === futureY)
    				clearInterval(intervalID);
    		}
    	}, 10);

    	return true;
    },

    attackStep: function(actor, dir){
        var personX = actor.x;
    	var personY = actor.y;
    	var futureX = dir.x + actor.x;
    	var futureY = dir.y + actor.y;
    	var sub = 0;
    	var i = 0;

    	var dx = 48 * actor.x;
    	var dy = 48 * actor.y;

    	var intervalID = setInterval( function(){
    		draw.place(personX, personY);
    		draw.place(futureX, futureY);

    		if(!sub)
    		{
    			if(dir.x > 0)
    				dx += 1;
    			else if(dir.x < 0)
    				dx -= 1;
    			else if(dir.y > 0)
    				dy += 1;
    			else if(dir.y < 0)
    				dy -= 1;
    		}
    		else
    		{
    			if(dir.x > 0)
    				dx -= 1;
    			else if(dir.x < 0)
    				dx += 1;
    			else if(dir.y > 0)
    				dy -= 1;
    			else if(dir.y < 0)
    				dy += 1;
    		}

    		draw.attackedActor(futureX, futureY);

    		switch(ActorMap[actor.y][actor.x])
    		{
                case 1:
                    context.drawImage(rabbitM, dx, dy);
                    break;

                case 2:
                    context.drawImage(rabbitW, dx, dy);
                    break;

                case 3:
                    context.drawImage(volfM, dx, dy);
                    break;

                case 4:
                    context.drawImage(volfW, dx, dy);
                    break;
    		}

            if(actorCoords[actor.x + "_" + actor.y] != undefined && actorCoords[j + "_" + i].hungry == 1)
            {
                context.drawImage(hungry, xMap, yMap + 1);
            }

            if(actorCoords[actor.x + "_" + actor.y] != undefined && actorCoords[j + "_" + i].inLove == 1)
            {
                context.drawImage(inLove, xMap + 30, yMap + 4);
            }

    		if(futureX != personX)
    		{
    			if(i === 24)
    				sub = 1;

    			if(dx === personX * 48)
    				clearInterval(intervalID);
    		}
    		else
    		{
    			if(i === 24)
    				sub = 1;

    			if(dy == personY * 48)
    				clearInterval(intervalID);
    		}
    		i++;
    	}, 10);

    	return true;
    },

    attackedActor: function(actorX, actorY) {
        var dx = actorX * 48;
    	var dy = actorY * 48;

		switch(ActorMap[actorY][actorX])
		{
            case 1:
                context.drawImage(rabbitM, dx, dy);
                break;

            case 2:
                context.drawImage(rabbitW, dx, dy);
                break;

            case 3:
                context.drawImage(volfM, dx, dy);
                break;

            case 4:
                context.drawImage(volfW, dx, dy);
                break;
		}
    }
}
