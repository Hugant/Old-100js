grass1I = document.getElementById("grass1I");
grass2I = document.getElementById("grass2I");
tree1I = document.getElementById("tree1I");
tree2I = document.getElementById("tree2I");
water1I = document.getElementById("water1I");
water2I = document.getElementById("water2I");
chestI = document.getElementById("chestI");

doorI = document.getElementById("doorI");
earthI = document.getElementById("earthI");
goblin1I = document.getElementById("goblin1I");
goblin2I = document.getElementById("goblin2I");
goblin3I = document.getElementById("goblin3I");
goblin4I = document.getElementById("goblin4I");
skeletonI = document.getElementById("skeletonI");
vampirI = document.getElementById("vampirI");
heroI = document.getElementById("heroI");
spaceI = document.getElementById("spaceI");

/* 
1 - grass1
2 - grass2
3 - tree1
4 - tree2
5 - water1
6 - water2
7 - earth
*/

/*
1 - goblin1
2 - goblin2
3 - goblin3
4 - goblin4
5 - skeleton
6 - vampir
7 - chest
8 - door
9 - hero
*/
function initMap()
{
	if(BackMap[1] == null && BackMap[1] != "underfined")
	{
		for(var i = 0; i < ROWS; i++)
		{
			BackMap[i] = new Array(COLS);
			for(var j = 0; j < COLS; j++)
			{
				if(BackMap[i][j] == null)
				{
					if(Math.random() > 0.8)
					{
						if(Math.random() > 0.5)
							BackMap[i][j] = 3;
						else
							BackMap[i][j] = 4;
					}
					else if(Math.random() > 0.99)
					{
						if(Math.random() > 0.5)
							BackMap[i][j] = 5;
						else
							BackMap[i][j] = 6;
					}
					else if(Math.random() > 0.9)
					{
						BackMap[i][j] = 7;
					}
					else
					{
						if(Math.random() > 0.5)
							BackMap[i][j] = 1;
						else
							BackMap[i][j] = 2;
					}
				}
			}
		}
		BackMap[5][0] = 1;
		BackMap[5][19] = 1;
	}
}

function initActors()
{	
	if(ActorMap[1] == null && ActorMap[1] != "underfined")
	{
		for(var i = 0; i < ROWS; i++)
		{
			ActorMap[i] = new Array(COLS);
			for(var j = 0; j < COLS; j++)
			{
				if(BackMap[i][j] == 0 || BackMap[i][j] == 2 || BackMap[i][j] == 5)
				{
					if(Math.random() > 0.9)
					{
						ActorMap[i][j] = 1;
						
						var actor = {
							name: "Goblin",
							x: j,
							y: i,
							hp: 1,
							id: 1,
							damage: Math.random() > 0.9 ? 2:1,
							vampirism: 0
						};
						
						actorCoords[actor.y + "_" + actor.x] = actor;
						actorList.push(actor);
					}
					else if(Math.random() > 0.99)
					{
						ActorMap[i][j] = 2;
						
						var actor = {
							name: "Goblin Captain",
							x: j,
							y: i,
							hp: 2,
							id: 2,
							damage: Math.random() > 0.9 ? 3:2,
							vampirism: 0
						};
						
						actorCoords[actor.y + "_" + actor.x] = actor;
						actorList.push(actor);
					}
					else if(Math.random() > 0.99)
					{
						ActorMap[i][j] = 3;
						
						var actor = {
							name: "Goblin Shaman",
							x: j,
							y: i,
							hp: 3,
							id: 3,
							damage: Math.random() > 0.9 ? 4:3,
							vampirism: 0
						};
						
						actorCoords[actor.y + "_" + actor.x] = actor;
						actorList.push(actor);
					}
					else if(Math.random() > 0.99)
					{
						ActorMap[i][j] = 4;
						
						var actor = {
							name: "Goblin King",
							x: j,
							y: i,
							hp: 5,
							id: 4,
							damage: Math.random() > 0.9 ? 6:5,
							vampirism: 0
						};
						
						actorCoords[actor.y + "_" + actor.x] = actor;
						actorList.push(actor);
					}
					else if(Math.random() > 0.99)
					{
						ActorMap[i][j] = 5;
						
						var actor = {
							name: "Skeleton",
							x: j,
							y: i,
							hp: 10,
							id: 5,
							damage: 1,
							vampirism: 0
						};
						
						actorCoords[actor.y + "_" + actor.x] = actor;
						actorList.push(actor);
					}
					else if(Math.random() > 0.99)
					{
						ActorMap[i][j] = 6;
						
						var actor = {
							name: "Vampir",
							x: j,
							y: i,
							hp: 3,
							id: 6,
							damage: Math.random() > 0.9 ? 2:1,
							vampirism: 1
						};
						
						actorCoords[actor.y + "_" + actor.x] = actor;
						actorList.push(actor);
					}
					else if(Math.random() > 0.99)
					{
						ActorMap[i][j] = 7;
						
						var actor = {
							name: "Chest",
							x: j,
							y: i,
							hp: (Math.floor(Math.random() * 2)),
							damage: (Math.floor(Math.random() * 2)),
							vampirism: Math.random() > 0.9999 ? (Math.floor(Math.random() * 1)):0
						};
						
						actorCoords[actor.y + "_" + actor.x] = actor;
						actorList.push(actor);
					}
					
					if(actorList.length > 12)
						break;
				}
			}
		}
		ActorMap[5][19] = 8;
		
		var actor = {
			name: "Door",
			x: 19,
			y: 5,
			hp: 1,
			damage: 1,
			vampirism: 0
		};
		
		actorCoords[actor.y + "_" + actor.x] = actor;
		actorList.push(actor);
		
		ActorMap[5][0] = 9;
		
		var actor = {
			name: "Hugant",
			x: 0,
			y: 5,
			hp: 10,
			id: 9,
			damage: 1,
			vampirism: 0
		};
		
		actorCoords[actor.y + "_" + actor.x] = actor;
		actorList.push(actor);
		player = actor;
	}
}

function drawMap()
{
	var xMap = 0;
	var yMap = 0;
	for(var i = 0; i < ROWS; i++)
	{
		for(var j = 0; j < COLS; j++)
		{	
			switch(BackMap[i][j])
			{			
				case 1:
					context.drawImage(grass1I, xMap, yMap);
					break;
					
				case 2:
					context.drawImage(grass2I, xMap, yMap);
					break;
					
				case 3:
					context.drawImage(tree1I, xMap, yMap);
					break;
				
				case 4:
					context.drawImage(tree2I, xMap, yMap);
					break;
				
				case 5:
					context.drawImage(water1I, xMap, yMap);
					break;
					
				case 6:
					context.drawImage(water2I, xMap, yMap);
					break;
					
				case 7:
					context.drawImage(earthI, xMap, yMap);
					break;
			}
			xMap += 48;
		}
		yMap += 48;
		xMap = 0;
	}
}

function drawPlace(x, y)
{
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
			
		case 3:
			context.drawImage(tree1I, xMap, yMap);
			break;
		
		case 4:
			context.drawImage(tree2I, xMap, yMap);
			break;
		
		case 5:
			context.drawImage(water1I, xMap, yMap);
			break;
			
		case 6:
			context.drawImage(water2I, xMap, yMap);
			break;
			
		case 7:
			context.drawImage(earthI, xMap, yMap);
			break;
	}
}

function drawStep(actor, dir)
{
	var personX = actor.x;
	var personY = actor.y;
	var futureX = dir.x + actor.x;
	var futureY = dir.y + actor.y;
	
	
	var dx = 48 * actor.x;
	var dy = 48 * actor.y;
	
	var intervalID = setInterval( function(){
		drawPlace(personX, personY);
		drawPlace(futureX, futureY);
		
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
				context.drawImage(goblin1I, dx, dy);
				break;
				
			case 2:
				context.drawImage(goblin2I, dx, dy);
				break;
				
			case 3:
				context.drawImage(goblin3I, dx, dy);
				break;
			
			case 4:
				context.drawImage(goblin4I, dx, dy);
				break;
			
			case 5:
				context.drawImage(skeletonI, dx, dy);
				break;
				
			case 6:
				context.drawImage(vampirI, dx, dy);
				break;
				
			case 9:
				context.drawImage(heroI, dx, dy);
				break;
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
}

function drawAtackStep(actor, dir)
{
	var personX = actor.x;
	var personY = actor.y;
	var futureX = dir.x + actor.x;
	var futureY = dir.y + actor.y;
	var sub = 0;
	var i = 0;
	
	var dx = 48 * actor.x;
	var dy = 48 * actor.y;
	
	var intervalID = setInterval( function(){
		drawPlace(personX, personY);
		drawPlace(futureX, futureY);
		
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
		
		drawAttackedActor(futureX, futureY);
		
		switch(ActorMap[actor.y][actor.x])
		{			
			case 1:
				context.drawImage(goblin1I, dx, dy);
				break;
				
			case 2:
				context.drawImage(goblin2I, dx, dy);
				break;
				
			case 3:
				context.drawImage(goblin3I, dx, dy);
				break;
			
			case 4:
				context.drawImage(goblin4I, dx, dy);
				break;
			
			case 5:
				context.drawImage(skeletonI, dx, dy);
				break;
				
			case 6:
				context.drawImage(vampirI, dx, dy);
				break;
				
			case 9:
				context.drawImage(heroI, dx, dy);
				break;
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
}

function drawAttackedActor(actorX, actorY)
{
	var dx = actorX * 48;
	var dy = actorY * 48;
	
		switch(ActorMap[actorY][actorX])
		{			
			case 1:
				context.drawImage(goblin1I, dx, dy);
				break;
				
			case 2:
				context.drawImage(goblin2I, dx, dy);
				break;
				
			case 3:
				context.drawImage(goblin3I, dx, dy);
				break;
			
			case 4:
				context.drawImage(goblin4I, dx, dy);
				break;
			
			case 5:
				context.drawImage(skeletonI, dx, dy);
				break;
				
			case 6:
				context.drawImage(vampirI, dx, dy);
				break;
			
			case 7:
				context.drawImage(chestI, dx, dy);
				break;
				
			case 8:
				context.drawImage(doorI, dx, dy);
				break;
			
			case 9:
				context.drawImage(heroI, dx, dy);
				break;
		}
}

function drawActors()
{
	var xMap = 0;
	var yMap = 0;
	for(var i = 0; i < ROWS; i++)
	{
		for(var j = 0; j < COLS; j++)
		{
			switch(ActorMap[i][j])
			{
				case 1:
					context.drawImage(goblin1I, xMap, yMap);
					break;
					
				case 2:
					context.drawImage(goblin2I, xMap, yMap);
					break;
					
				case 3:
					context.drawImage(goblin3I, xMap, yMap);
					break;
					
				case 4:
					context.drawImage(goblin4I, xMap, yMap);
					break;
					
				case 5:
					context.drawImage(skeletonI, xMap, yMap);
					break;
				
				case 6:
					context.drawImage(vampirI, xMap, yMap);
					break;
				
				case 7:
					context.drawImage(chestI, xMap, yMap);
					break;
				
				case 8:
					context.drawImage(doorI, xMap, yMap);
					break;
				
				case 9:
					context.drawImage(heroI, xMap, yMap);
			}
			xMap += 48;
		}
		yMap += 48;
		xMap = 0;
	}
	
}

				