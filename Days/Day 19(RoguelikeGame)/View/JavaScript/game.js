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
var numberEnemies = 0;
var enemyStep;
var levelGameActive;
var checkNextLevel = 0;
var acted = false;
var levelReplay = 0;
var activeActors = new Array();

function randomGame()
{
	create.randomWorld();
	levelGameActive = 0;
}

function levelGame()
{
	if(!passedLevel[activeLevel - 1])
	{
		create.world();
		out.vision('levels', 'off', 'Refresh', 'off', 'gameLook', 'on');
		levelGameActive = 1;
	}
}

function deleteWorld()
{
	clearInterval(enemyStep);
	deleteVirtualKeyboard();
	BackMap = new Array(ROWS);
	ActorMap = new Array(ROWS);
	activeActors = [];
	actorCoords = {};
	actorList = [];
}

function replay()
{
	deleteWorld();
	create.randomWorld();
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
	numberEnemies = 3;
	for(var e in actorList)
	{
		if(actorList[e] != null)
			if(!(actorList[e].name == "Hugant" || actorList[e].name == "Door" || actorList[e].name == "Chest"))
				numberEnemies++;
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

			out.personStats(player);
		}
		else
		{
			clearInterval(enemyStep);
			setTimeout(function() {
				enemyStep = setInterval(engine, 250);
				if(activeActors[enemy] != null)
				{
					var e = activeActors[enemy];
					aiAct(e);
				}
				enemy++;

				if(enemy >= numberEnemies)
				{
					clearInterval(enemyStep);
					gameLoop();
				}

				out.personStats(player);
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
						actor.hp += victim.hp;
						playerStats = player;
						nextLevel();
						checkNextLevel = 1;
					}
					else
					{
						replay();
					}
					out.unknownEnemy();
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
				out.personStats(actor);
			}
			else if(actor.name == "Hugant")
			{
				out.personStats(victim);
			}

			if(victim.hp < 1)
			{
				if(victim.name == "Vampir")
					actor.vampirism++;

				numberEnemies--;
				actorCoords[newKey] = null;
				actorList.remove(victim);
				actorList[actorList.indexOf(victim)] = null;
				activeActors[activeActors.indexOf(victim)] = null;
				ActorMap[victim.y][victim.x] = 0;
				drawPlace(victim.x, victim.y);
				out.deceasedPerson();
			}
		}
	}
	else
	{
		if(actor.name == "Hugant")
		{
			out.unknownEnemy();
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
			create.world();
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

Array.prototype.clone = function () {
	return this.slice(0);
};

function arrayClone (arr) 
{
	var i, copy;
	
	if (Array.isArray(arr)) 
	{
		copy = arr.slice(0);
		for (i = 0; i < copy.length; i++) 
		{
			copy[i] = arrayClone(copy[i]);
		}
		return copy;
	} 
	else if(typeof arr === 'object') 
	{
		throw 'Cannot clone array containing an object!';
	} 
	else 
	{
		return arr;
	}
}

function endGame()
{
	if(passedLevel[activeLevel - 1] == 0)
	{
		out.vision('gameLook', 'off', 'levels', 'off', 'Refresh', 'off', 'endGame', 'on');
		deleteWorld();
		passedLevel[activeLevel - 1] = 1;
		checkLevels();
	}
}

function checkPassword(value)
{
	if(value.toLowerCase() == "code is life")
	{
		out.vision('endGame', 'off', 'youWin', 'on');
	}
}