var count = 0;
var funCount = 0;

function hideShowInfo()
{
	if(!count)
	{
		document.getElementById('info').style.display = 'none'; 
		document.getElementById('hide_show').innerHTML = 'Show info';
		count = 1;
	}
	else
	{
		document.getElementById('info').style.display = 'block'; 
		document.getElementById('hide_show').innerHTML = 'Hide info';
		count = 0;
	}
}

function funA()
{
	if(!funCount)
	{
		document.getElementById('fun').style.display = 'block'; 
		document.getElementById('shit').innerHTML = 'Do you think this game is cool!!!';
		funCount = 1;
	}
	else
	{
		document.getElementById('fun').style.display = 'none'; 
		document.getElementById('shit').innerHTML = 'Do you think this game is shit???';
		funCount = 0;
	}
}


///////////////////////////////////
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
	BackMap = new Array(ROWS);
	ActorMap = new Array(ROWS);
	actorCoords= {};
	actorList = [];
	initMap();
	initActors();
	drawMap();
	drawActors();
}

window.onload = function() {
	createWorld();
	
	setInterval(function() {
		
		var acted = false;
		if(isKeyDown("LEFT"))
		{
			drawPlace(player.x, player.y);
			acted = moveTo(player, { x: -1, y: 0});
		}
		if(isKeyDown("UP"))
		{
			drawPlace(player.x, player.y);
			acted = moveTo(player, { x: 0, y: -1});	
		}
		if(isKeyDown("RIGHT"))
		{
			drawPlace(player.x, player.y);
			acted = moveTo(player, { x: 1, y: 0});
		}
		if(isKeyDown("DOWN"))
		{	
			drawPlace(player.x, player.y);
			acted = moveTo(player, { x: 0, y: 1});	
		}
		
		document.getElementById("hillpoint").innerHTML = player.hp;
		document.getElementById("damage").innerHTML = player.damage;
		document.getElementById("vampirism").innerHTML = player.vampirism;
		
		if(acted)
		{
			for(var enemy in actorList)
			{
				if(actorList[enemy] != null)
				{
					if(actorList[enemy].name == "Hugant" || actorList[enemy].name == "Door" || actorList[enemy].name == "Chest")
					{
						continue;
					}
					
					var e = actorList[enemy];
					aiAct(e);
				}
			}
		}
		drawActors();
		
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
			drawPlace(victim.x, victim.y);
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
			}
			else if(BackMap[victim.y][victim.x] == 7)
			{
				if(Math.random() > 0.5)
				{
					victim.hp -= actor.damage;
					actor.hp += actor.vampirism;
				}
			}
			else
			{
				victim.hp -= actor.damage;
				actor.hp += actor.vampirism;
			}
			
			if(actor.name == "Hugant")
			{
				document.getElementById("enemy_name").innerHTML = victim.name;
				document.getElementById("enemy_hillpoint").innerHTML = victim.hp;
				document.getElementById("enemy_damage").innerHTML = victim.damage;
				document.getElementById("enemy_vampirism").innerHTML = victim.vampirism;
			}

			if(victim.name == "Hugant")
			{
				document.getElementById("enemy_name").innerHTML = actor.name;
				document.getElementById("enemy_hillpoint").innerHTML = actor.hp;
				document.getElementById("enemy_damage").innerHTML = actor.damage;
				document.getElementById("enemy_vampirism").innerHTML = actor.vampirism;
			}
			
			if(victim.hp < 1)
			{
				if(actor.name == "Hugant")
				{
					document.getElementById("enemy_name").innerHTML = victim.name;
					document.getElementById("enemy_hillpoint").innerHTML = "0";
					document.getElementById("enemy_damage").innerHTML = "0";
					document.getElementById("enemy_vampirism").innerHTML = "0";
				}
				
				actorCoords[newKey] = null;
				actorList[actorList.indexOf(victim)] = null;
				ActorMap[victim.y][victim.x] = 0;
				drawPlace(victim.x, victim.y);
			}
		}
	}
	else
	{
		document.getElementById("enemy_name").innerHTML = "??????";
		document.getElementById("enemy_hillpoint").innerHTML = "??";
		document.getElementById("enemy_damage").innerHTML = "??";
		document.getElementById("enemy_vampirism").innerHTML = "??";
		
		actorCoords[actor.y + '_' + actor.x] = null;
		ActorMap[actor.y][actor.x] = 0;
		
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
			drawPlace(actor.x, actor.y);
			moveTo(actor, { x: -1, y: 0});
		}
		else
		{
			drawPlace(actor.x, actor.y);
			moveTo(actor, { x: 1, y: 0});
		}
	}
	else
	{
		if(dy < 0)
		{
			drawPlace(actor.x, actor.y);
			moveTo(actor, { x: 0, y: -1});
		}
		else
		{
			drawPlace(actor.x, actor.y );
			moveTo(actor, { x: 0, y: 1});
		}
	}
	
	if(player.hp < 1)
	{
		console.log("YOU LOSE");
		replay();
	}
}