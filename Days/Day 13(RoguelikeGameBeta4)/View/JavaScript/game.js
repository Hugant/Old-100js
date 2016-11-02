var count = 0;

function funA()
{
	if(!count)
	{
		document.getElementById('fun').style.display = 'block'; 
		document.getElementById('shit').innerHTML = 'Do you think this game is cool!!!';
		count = 1;
	}
	else
	{
		document.getElementById('fun').style.display = 'none'; 
		document.getElementById('shit').innerHTML = 'Do you think this game is shit???';
		count = 0;
	}
}


/////////////////////////////////////////////////////////////////////////////////////////////////
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 480;

var BackMap = [ [0, 0,  4, 0, 7, 7, 0, 0, 0, 0,  0,  0, 0, 0, 7, 7,  0, 0,  0, 0],
				[0, 0,  0, 0, 7, 7, 0, 0, 0, 0,  0,  0, 0, 2, 0, 0,  3, 0,  0, 0],
				[0, 0,  0, 2, 0, 0, 3, 0, 0, 0,  0,  0, 0, 6, 0, 0, 13, 4, 13, 0],
				[0, 0,  6, 0, 0, 0, 0, 0, 0, 0,  0,  0, 5, 0, 6, 0,  6, 0,  5, 0],
				[0, 0, 12, 0, 0, 1, 0, 0, 0, 0,  0,  0, 0, 0, 0, 1,  0, 0,  0, 0],
				[0, 0,  0, 6, 0, 0, 4, 4, 4, 0,  0, 11, 0, 0, 0, 1,  0, 0,  0, 0],
				[0, 0,  0, 0, 0, 0, 0, 0, 0, 0,  0,  0, 0, 0, 0, 1,  0, 0,  0, 0],
				[0, 0,  5, 0, 6, 0, 6, 0, 5, 0, 10,  0, 0, 0, 0, 1,  0, 0,  0, 0],
				[0, 0,  0, 0, 0, 1, 0, 0, 0, 0,  0,  0, 0, 6, 0, 0,  4, 4,  4, 0],
				[0, 0,  8, 0, 0, 0, 0, 0, 0, 0,  9,  0, 0, 0, 0, 1,  0, 0,  0, 0] ];

var ActorMap = [ [0, 0,  4, 0, 7, 7, 0, 0, 0, 0,  0,  0, 0, 0, 7, 7,  0, 0,  0, 0],
				 [0, 0,  0, 0, 7, 7, 0, 0, 0, 0,  0,  0, 0, 2, 0, 0,  3, 0,  0, 0],
				 [0, 0,  0, 2, 0, 0, 3, 0, 0, 0,  0,  0, 0, 6, 0, 0, 13, 4, 13, 0],
				 [0, 0,  6, 0, 0, 0, 0, 0, 0, 0,  0,  0, 5, 0, 6, 0,  6, 0,  5, 0],
				 [0, 0, 12, 0, 0, 1, 0, 0, 0, 0,  0,  0, 0, 0, 0, 1,  0, 0,  0, 0],
				 [0, 0,  0, 6, 0, 0, 4, 4, 4, 0,  0, 11, 0, 0, 0, 1,  0, 0,  0, 0],
				 [0, 0,  0, 0, 0, 0, 0, 0, 0, 0,  0,  0, 0, 0, 0, 1,  0, 0,  0, 0],
				 [0, 0,  5, 0, 6, 0, 6, 0, 5, 0, 10,  0, 0, 0, 0, 1,  0, 0,  0, 0],
				 [0, 0,  0, 0, 0, 1, 0, 0, 0, 0,  0,  0, 0, 6, 0, 0,  4, 4,  4, 0],
				 [0, 0,  8, 0, 0, 0, 0, 0, 0, 0,  9,  0, 0, 0, 0, 1,  0, 0,  0, 0] ];
				
var ROWS = 10;
var COLS = 20;
	
var BackMap = new Array(ROWS);
var ActorMap = new Array(ROWS);
var actorCoords= {};
var actorList = [];

function createWorld()
{
	initMap();
	initActors();
	drawMap();
	drawActors();
	createVirtualKeyboard();
}

function replay()
{
	deleteVirtualKeyboard();
	BackMap = new Array(ROWS);
	ActorMap = new Array(ROWS);
	actorCoords= {};
	actorList = [];
	initMap();
	initActors();
	drawMap();
	drawActors();
	createVirtualKeyboard();
}

function game()
{
	createWorld();
	
	setInterval(function() {
		var acted = false;
		if(isKeyDown("LEFT"))
		{
			acted = moveTo(player, { x: -1, y: 0});
		}
		if(isKeyDown("UP"))
		{
			acted = moveTo(player, { x: 0, y: -1});	
		}
		if(isKeyDown("RIGHT"))
		{
			acted = moveTo(player, { x: 1, y: 0});
		}
		if(isKeyDown("DOWN"))
		{	
			acted = moveTo(player, { x: 0, y: 1});	
		}
		
		document.getElementById("hillpoint").innerHTML = player.hp;
		document.getElementById("damage").innerHTML = player.damage;
		document.getElementById("vampirism").innerHTML = player.vampirism;
		
		if(acted)
		{
			deleteVirtualKeyboard();
			var enemy = 0;
			var timeoutLength = 1000;
			var timeout = setTimeout(function CVK() { createVirtualKeyboard();}, timeoutLength);
			var interval = setInterval( function test() {
				if(actorList[enemy] != null)
				{
					if(actorList[enemy].name == "Hugant" || actorList[enemy].name == "Door" || actorList[enemy].name == "Chest")
					{
						clearInterval(interval);
					}
					else
					{
						var e = actorList[enemy];
						if(aiAct(e))
						{
							timeoutLength += 1000;
							clearTimeout(timeout);
							timeout = setTimeout(function CVK() { createVirtualKeyboard();}, timeoutLength);
						}
					}
				}
				enemy++;
				if(actorList.length > enemy)
					interval = setInterval(test, 1000);
				else
				{
					clearInterval(interval);
				}
				
			}, 1000);
		}
		/*if(acted)
		{
			for(var enemy in actorList)
			{
				if(actorList[enemy] != null)
				{
					if(actorList[enemy].name == "Hugant" || actorList[enemy].name == "Door" || actorList[enemy].name == "Chest")
					{
						continue;
					}
					else if(actorList[enemy].name == "Hugant")
					{
						continue;
					}
					
					var e = actorList[enemy];
					aiAct(e);
				}
			}
		}*/
	}, 130);
};

function canGo(actor, dir)
{
	return actor.x + dir.x >= 0 &&
	actor.x + dir.x <= COLS - 1 &&
	actor.y + dir.y >= 0        &&
	actor.y + dir.y <= ROWS - 1 &&
	( BackMap[actor.y + dir.y][actor.x + dir.x] == 1 ||
	  BackMap[actor.y + dir.y][actor.x + dir.x] == 2 ||
	  BackMap[actor.y + dir.y][actor.x + dir.x] >= 5 );
}

function moveTo(actor, dir)
{
	if(!canGo(actor, dir))
		return false;
	
	var newKey = (actor.y + dir.y) + "_" + (actor.x + dir.x);
	
	if(actorCoords[newKey] != null && actorCoords[newKey] != actor)
	{
		var victim = actorCoords[newKey];
		if(victim.name == "Chest")
		{
			actor.hp += victim.hp;
			actor.damage += victim.damage;
			actor.vampirism += victim.vampirism;
			
			actorCoords[newKey] = null;
			actorList[actorList.indexOf(victim)] = null;
			ActorMap[victim.y][victim.x] = 0;
			//drawPlace(victim.x, victim.y);
			drawAtackStep(actor, dir);
		}
		else if(victim.name == "Door")
		{
			if(actor.name == "Hugant")
			{	
				actor.hp += victim.hp;
				actor.damage += victim.damage;
				console.log("VICTORY");
				replay();
			}
		}
		else
		{	
			if(BackMap[actor.y][actor.x] == 5 || BackMap[actor.y][actor.x] == 6)
			{
				victim.hp -= actor.damage - 1;
				actor.hp += actor.vampirism - 1;
				drawAtackStep(actor, dir);
			}
			else if(BackMap[victim.y][victim.x] == 7)
			{
				if(Math.random() > 0.5)
				{
					victim.hp -= actor.damage;
					actor.hp += actor.vampirism;
					drawAtackStep(actor, dir);
				}
			}
			else
			{
				victim.hp -= actor.damage;
				actor.hp += actor.vampirism;
				drawAtackStep(actor, dir);
			}
			
			if(actor.name != "Hugant" && victim.name == "Hugant")
			{
				document.getElementById("enemy_name").innerHTML = actor.name;
				document.getElementById("enemy_hillpoint").innerHTML = actor.hp;
				document.getElementById("enemy_damage").innerHTML = actor.damage;
				document.getElementById("enemy_vampirism").innerHTML = actor.vampirism;
			}
			else if(actor.name == "Hugant")
			{
				document.getElementById("enemy_name").innerHTML = victim.name;
				document.getElementById("enemy_hillpoint").innerHTML = victim.hp;
				document.getElementById("enemy_damage").innerHTML = victim.damage;
				document.getElementById("enemy_vampirism").innerHTML = victim.vampirism;
			}
			
			if(victim.hp < 1)
			{	
				if(victim.name == "Vampir")
					actor.vampirism = 1;
					
				actorCoords[newKey] = null;
				actorList[actorList.indexOf(victim)] = null;
				ActorMap[victim.y][victim.x] = 0;
				drawPlace(victim.x, victim.y);
				
				document.getElementById("enemy_hillpoint").innerHTML = "-";
				document.getElementById("enemy_damage").innerHTML = "-";
				document.getElementById("enemy_vampirism").innerHTML = "-";
			}
		}
	}
	else
	{	
		if(actor.name == "Hugant")
		{
			document.getElementById("enemy_name").innerHTML = "??????";
			document.getElementById("enemy_hillpoint").innerHTML = "??";
			document.getElementById("enemy_damage").innerHTML = "??";
			document.getElementById("enemy_vampirism").innerHTML = "??";
		}
		
		actorCoords[actor.y + '_' + actor.x] = null;
		ActorMap[actor.y][actor.x] = 0;
		nextStep = drawStep(actor, dir);
		actor.x += dir.x;
		actor.y += dir.y;
		
		ActorMap[actor.y][actor.x] = actor.id;
		actorCoords[actor.y + '_' + actor.x] = actor;
	}
	return true;
}


function aiAct(actor)
{
	var dx = player.x - actor.x;
	var dy = player.y - actor.y;
	
	if(Math.abs(dx) > Math.abs(dy))
	{
		if(dx < 0)
		{
			aiStep = moveTo(actor, { x: -1, y: 0});
		}
		else
		{
			aiStep = moveTo(actor, { x: 1, y: 0});
		}
	}
	else
	{
		if(dy < 0)
		{
			aiStep = moveTo(actor, { x: 0, y: -1});
		}
		else
		{
			aiStep = moveTo(actor, { x: 0, y: 1});
		}
	}
	
	if(player.hp < 1)
	{
		console.log("YOU LOSE");
		replay();
	}
	return aiStep;
}