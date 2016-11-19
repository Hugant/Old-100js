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

var countLoop = 0;

var draw = {
    world: function() {
        intervalID = setInterval( function() {
            if(countLoop == 48) {
                countLoop = 0;
                clearInterval(intervalID);
                return;
            }

            for(var actor in Actors) {
                if(Actors[actor] != null) {
                    switch(Actors[actor].direction) {
                        case 1:
                            Actors[actor].dy--;
                            break;

                        case 2:
                            Actors[actor].dx++;
                            //console.log(countLoop + ": " + Actors[actor].dx);
                            break;

                        case 3:
                            Actors[actor].dy++;
                            break;

                        case 4:
                            Actors[actor].dx--;
                            break;

                        case 5:
                            if(countLoop < 24)
                                Actors[actor].dy--;
                            else
                                Actors[actor].dy++;
                            break;

                        case 6:
                            if(countLoop < 24)
                                Actors[actor].dx++;
                            else
                                Actors[actor].dx--;
                            break;

                        case 7:
                            if(countLoop < 24)
                                Actors[actor].dy++;
                            else
                                Actors[actor].dy--;
                            break;

                        case 8:
                            if(countLoop < 24)
                                Actors[actor].dx--;
                            else
                                Actors[actor].dx++;
                            break;
                    }
                }
            }

            draw.map();
            draw.actors();

            countLoop++;
        }, 15);
    },

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
        for(var actor in Actors) {
            if(Actors[actor] != null) {
                context.drawImage(Actors[actor].image, Actors[actor].dx, Actors[actor].dy);

                if(Actors[actor].hungry) {
                    context.drawImage(hungry, Actors[actor].dx, Actors[actor].dy + 1);
                }

                if(Actors[actor].inLove) {
                    context.drawImage(inLove, Actors[actor].dx + 30, Actors[actor].dy + 4);
                }

                if(Actors[actor].age < 5) {
                    context.drawImage(death, Actors[actor].dx + 23, Actors[actor].dy + 20);
                }
            }
        }
    }
}
