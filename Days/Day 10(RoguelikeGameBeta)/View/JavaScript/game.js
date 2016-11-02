var FONT = 32;

var ROWS = 20;
var COLS = 30;

var ACTORS = 25;

var map;
var actorMap;
var asciidisplay;

var player;
var actorList;
var livingEnemies;

var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.AUTO, null, {
	create: create
});

function create()
{
	game.input.keyboard.addCallbacks(null, null, onKeyUp);
	initMap();
	initActors();
	
	asciidisplay = [];
	for(var i = 0; i < ROWS; i++) 
	{
        var newRow = [];
        asciidisplay.push(newRow);
        for(var j = 0; j < COLS; j++)
		{
			newRow.push(initCell('', j, i, "fff"));
		}
    }
	
	drawMap();
	drawActors();
}

///////////////////////////////////////////////////////////////////////////////////

function randInt(max)
{
	return Math.floor(Math.random() * max);
}

function initMap()
{
	map = [];
	for(var i = 0; i < ROWS; i++)
	{
		var newRow = [];
		for(var j = 0; j < COLS; j++)
		{
			if(Math.random() > 0.8)
				newRow.push('#');
			else
				newRow.push('.');
		}
		map.push(newRow);
	}
}

function initActors()
{
	actorList = [];
	actorMap = {};
	
	for(var e = 0; e < ACTORS; e++)
	{
		var actor = {
			x: 0,
			y: 0,
			hp: e == 0 ? 3:1
		};
		
		do
		{
			actor.y = randInt(ROWS);
			actor.x = randInt(COLS);
		}
		while(map[actor.y][actor.x] == '#' || actorMap[actor.y + "_" + actor.x] != null);
		
		actorMap[actor.y + "_" + actor.x] = actor;
		actorList.push(actor);
	}
	
	player = actorList[0];
	livingEnemies = ACTORS - 1;
}

///////////////////////////////////////////////////////////////////////////////////

function drawMap()
{
	for(var i = 0; i < ROWS; i++)
	{
		for(var j = 0; j < COLS; j++)
		{
			asciidisplay[i][j].content = map[i][j];
		}
	}
}

function drawActors()
{
	for(var a in actorList)
	{
		if (actorList[a] != null && actorList[a].hp > 0) 
			asciidisplay[actorList[a].y][actorList[a].x].content = a == 0 ? '' + player.hp : 'e';
	}
}

function initCell(chr, x, y, color)
{
	var style = { 
		font: FONT + "px monospace",
		fill: "#" + color
	};
	return game.add.text(FONT * 0.6 * x, FONT * y, chr, style);
}

///////////////////////////////////////////////////////////////////////////////////

function onKeyUp(event)
{
	drawMap();
	
	var acted = false;
	switch(event.keyCode)
	{
		case Phaser.Keyboard.LEFT:
			acted = moveTo(player, {x: -1, y: 0});
			break;
		
		case Phaser.Keyboard.RIGHT:
			acted = moveTo(player, {x: 1, y: 0});
			break;
		
		case Phaser.Keyboard.UP:
			acted = moveTo(player, {x: 0, y: -1});
			break;
		
		case Phaser.Keyboard.DOWN:
			acted = moveTo(player, {x: 0, y: 1});
			break;
	}
	
	if(acted)
	{
		for(var enemy in actorList)
		{
			if(enemy == 0)
				continue;
				
			var e = actorList[enemy];
			if(e != null)
				aiAct(e);
		}
	}
	drawActors();
}

function canGo(actor, dir)
{
	return actor.x + dir.x >= 0 &&
	actor.x + dir.x <= COLS - 1 &&
	actor.y + dir.y >= 0        &&
	actor.y + dir.y <= ROWS - 1 &&
	map[actor.y + dir.y][actor.x + dir.x] == '.';
}

function moveTo(actor, dir)
{
	if(!canGo(actor, dir))
		return false;
	
	var newKey = (actor.y + dir.y) + '_' + (actor.x + dir.x);
	
	if(actorMap[newKey] != null)
	{
		var victim = actorMap[newKey];
		victim.hp--;
		
		if(victim.hp == 0)
		{
			actorMap[newKey] = null;
			actorList[actorList.indexOf(victim)] = null;
			if(victim != player)
			{
				livingEnemies--;
				if(livingEnemies == 0)
				{
					var victory = game.add.text(game.world.centerX, game.world.centerY, 'Victory!', { 
						fill : '#2e2', 
						align: "center"
					});
					victory.anchor.setTo(0.5,0.5);
				}
			}
		}
	}
	else
	{
		actorMap[actor.y + '_' + actor.x] = null;
		
		actor.y += dir.y;
		actor.x += dir.x;
		
		actorMap[actor.y + '_' + actor.x] = actor;
	}
	return true;
}

function aiAct(actor)
{
	var directions = [  {x: -1, y:  0},
						{x:  1, y:  0},
						{x:  0, y: -1},
						{x:  0, y:  1}];
	
	var dx = player.x - actor.x;
	var dy = player.y - actor.y;
	
	if(Math.abs(dx) > Math.abs(dy))
	{
		if(dx < 0)
			moveTo(actor, directions[0]);
		else
			moveTo(actor, directions[1]);
	}
	else
	{
		if(dy < 0)
			moveTo(actor, directions[2]);
		else
			moveTo(actor, directions[3]);
	}
	
	if(player.hp < 1)
	{
		var gameOver = game.add.text(game.world.centerX, game.world.centerY, 'Game Over\nCtrl+r to restart', { fill : '#e22', align: "center" 
		});
		gameOver.anchor.setTo(0.5,0.5);
	}
}