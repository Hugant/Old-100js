var create = {
    randomWorld: function()
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
    },

    world: function()
    {
        document.getElementById("viewLevel").innerHTML = "Level " + activeLevel;
    	switch(activeLevel)
    	{
    		case 1:
    			BackMap = arrayClone(level1.map);
    			ActorMap = arrayClone(level1.actor);
    			break;

    		case 2:
    			BackMap = arrayClone(level2.map);
    			ActorMap = arrayClone(level2.actor);
    			break;

    		case 3:
    			BackMap = arrayClone(level3.map);
    			ActorMap = arrayClone(level3.actor);
    			break;

    		case 4:
				BackMap = arrayClone(level4.map);
    			ActorMap = arrayClone(level4.actor);
    			break;

    		case 5:
    			BackMap = arrayClone(level5.map);
    			ActorMap = arrayClone(level5.actor);
    			break;

    		case 6:
    			BackMap = arrayClone(level6.map);
    			ActorMap = arrayClone(level6.actor);
    			break;

    		case 7:
    			BackMap = arrayClone(level7.map);
    			ActorMap = arrayClone(level7.actor);
    			break;

    		case 8:
    			BackMap = arrayClone(level8.map);
    			ActorMap = arrayClone(level8.actor);
    			break;

    		case 9:
    			BackMap = arrayClone(level9.map);
    			ActorMap = arrayClone(level9.actor);
    			break;

    		case 10:
    			BackMap = arrayClone(level10.map);
    			ActorMap = arrayClone(level10.actor);
    			break;

    		case 11:
    			BackMap = arrayClone(level11.map);
    			ActorMap = arrayClone(level11.actor);
    			break;

    		case 12:
    			BackMap = arrayClone(level12.map);
    			ActorMap = arrayClone(level12.actor);
    			break;

    		case 13:
    			BackMap = arrayClone(level13.map);
    			ActorMap = arrayClone(level13.actor);
    			break;

    		case 14:
    			BackMap = arrayClone(level14.map);
    			ActorMap = arrayClone(level14.actor);
    			break;

    		case 15:
    			endGame();
    			break;
        }
        
    	initActors();
    	drawMap();
    	drawActors();


    	if(activeLevel != 1 && levelReplay == 0)
    	{
    		player.hp = playerStats.hp;
    		player.damage = playerStats.damage;
    		player.vampirism = playerStats.vampirism;
    	}

    	createVirtualKeyboard();
    	gameLoop();
    }
}
