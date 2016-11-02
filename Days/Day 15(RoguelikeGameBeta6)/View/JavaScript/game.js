var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 480;

var ROWS = 10;
var COLS = 20;
	
var BackMap;
var ActorMap;
var actorCoords = {};
var actorList = [];
var numberEnemies;
var enemyStep;
var levelGameActive;
var checkNextLevel = 0;
var acted = false;
var levelReplay = 0;

function randomGame()
{
	createRandomWorld();
	levelGameActive = 0;
}

function levelGame()
{
	if(!passedLevel[activeLevel - 1])
	{
		createWorld();
		
		document.getElementById('levels').style.display = 'none';
		document.getElementById('gameLook').style.display = 'block';
		document.getElementById('Refresh').style.display = 'none';
		
		levelGameActive = 1;
	}
}

function createRandomWorld()
{
	document.getElementById("viewLevel").innerHTML = "Random game";
	BackMap = new Array(ROWS);
	ActorMap = new Array(ROWS);
	initMap();
	initActors();
	drawMap();
	drawActors();
	createVirtualKeyboard();
	gameLoop();
}

function createWorld()
{
	document.getElementById("viewLevel").innerHTML = "Level " + activeLevel;
	switch(activeLevel)
	{
		case 1: 
			BackMap = level1.map;
			ActorMap = level1.actor;
			break;
			
		case 2: 
			BackMap = level2.map;
			ActorMap = level2.actor;
			break;
			
		case 3:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 4:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 5:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 6:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 7:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 8:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 9:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 10:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
		
		case 11:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 12:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 13:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 14:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
			
		case 15:
			BackMap = level3.map;
			ActorMap = level3.actor;
			break;
	}
	actorList.deleteM();
	console.log(actorList);
	initActors();
	drawMap();
	drawActors();
	console.log(actorList);
	
	if(activeLevel != 1 && levelReplay == 0)
	{
		player.hp = playerStats.hp;
		player.damage = playerStats.damage;
		player.vampirism = playerStats.vampirism;
	}
	
	createVirtualKeyboard();
	gameLoop();	
}

function deleteWorld()
{
	clearInterval(enemyStep);
	deleteVirtualKeyboard();
	BackMap = new Array(ROWS);
	ActorMap = new Array(ROWS);
	actorCoords = {};
	actorList = [];
}

function replay()
{
	deleteWorld();
	createRandomWorld();
}

function nextLevel()
{
	deleteWorld();
	passedLevel[activeLevel - 1] = 1;
	passedLevel[activeLevel] = 0;
	checkLevels();
	activeLevel++;
	levelGame();
}

function checkNumberEnemies()
{
	numberEnemies = actorList.length + 2;
	for(var e in actorList)
	{
		if(actorList[e] != null)
			if(actorList[e].name == "Hugant" || actorList[e].name == "Door")
				numberEnemies--;
	}
}

function gameLoop()
{
	var enemy = 0;
	acted = false;
	checkNextLevel = 0;
		
	document.getElementById('backToMenu').innerHTML = "Back";
	
	enemyStep = setInterval(function engine() {
		checkNumberEnemies();
		if(!acted)
		{	
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
			
			if(!acted)
			{
				clearInterval(enemyStep);

				setTimeout(function() {
					offTwink(player);
				}, 200);
				onTwink(player);
				
				
				enemyStep = setInterval(engine, 600);
			}
		
			document.getElementById("hillpoint").innerHTML = player.hp;
			document.getElementById("damage").innerHTML = player.damage;
			document.getElementById("vampirism").innerHTML = player.vampirism;
		}
		else
		{
			clearInterval(enemyStep);
			setTimeout(function() {
				enemyStep = setInterval(engine, 250);
				if(actorList[enemy] != null)
				{
					if(!(actorList[enemy].name == "Hugant" || actorList[enemy].name == "Door" || actorList[enemy].name == "Chest"))
					{
						var e = actorList[enemy];
						aiAct(e);
					}
				}
				enemy++;
				
				if(enemy >= numberEnemies)
				{
					clearInterval(enemyStep);
					gameLoop();
				}
				
				document.getElementById("hillpoint").innerHTML = player.hp;
				document.getElementById("damage").innerHTML = player.damage;
				document.getElementById("vampirism").innerHTML = player.vampirism;
			}, 250);
		}
	}, 150);
}

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
			drawAtackStep(actor, dir);
		}
		else if(victim.name == "Door")
		{
			if(actor.name == "Hugant")
			{	
				if(!checkNextLevel)
				{
					if(levelGameActive)
					{
						clearInterval(enemyStep);				
						playerStats = player;
						nextLevel();
						checkNextLevel = 1;
					}
					else
					{
						actor.hp += victim.hp;
						actor.damage += victim.damage;
						replay();
					}
					document.getElementById("enemy_name").innerHTML = "??????";
					document.getElementById("enemy_hillpoint").innerHTML = "??";
					document.getElementById("enemy_damage").innerHTML = "??";
					document.getElementById("enemy_vampirism").innerHTML = "??";
				}
			}
		}
		else
		{	
			if(BackMap[actor.y][actor.x] == 5 || BackMap[actor.y][actor.x] == 6)
			{
				victim.hp -= actor.damage - 1;
				if(actor.vampirism > 0)
					actor.hp += actor.vampirism - 1;
				drawAtackStep(actor, dir);
			}
			else if(BackMap[victim.y][victim.x] == 7)
			{
				if(Math.random() > 0.5)
				{
					victim.hp -= actor.damage;
					actor.hp += actor.vampirism;
				}
				drawAtackStep(actor, dir);
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
					actor.vampirism++;
				
				numberEnemies--;
				actorCoords[newKey] = null;
				actorList.remove(victim);
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
		ActorMap[actor.y + dir.y][actor.x + dir.x] = ActorMap[actor.y][actor.x];
		ActorMap[actor.y][actor.x] = 0;
		
		nextStep = drawStep(actor, dir);
		actor.x += dir.x;
		actor.y += dir.y;
		
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
		if(levelGameActive)
		{	
			levelReplay = 1;
			deleteWorld();
			levelGame();
			
		}
		else
		{
			replay();
		}
	}
	return aiStep;
}

Array.prototype.remove = function(value) {
	var index = this.indexOf(value);
	if(index != -1)
		return this.splice(index, 1);
	else
		return false;
};

Array.prototype.deleteM = function()
{
	for(var i = 0; i < this.length; i++)
		this.remove(i, 1);
}