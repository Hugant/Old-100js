var init = {
    world: function() {
        BackMap = new Array(ROWS);
        ActorMap = new Array(ROWS);
        init.map();
        init.actors();
        draw.map();
        draw.actors();
    },

    map: function() {
        if(BackMap[1] == null && BackMap[1] != "underfined") {
    		for(var i = 0; i < ROWS; i++) {
    			BackMap[i] = new Array(COLS);
    			for(var j = 0; j < COLS; j++) {
    				if(BackMap[i][j] == null) {
    					if(Math.random() > 0.8) {
    						if(Math.random() > 0.5)
    							BackMap[i][j] = 3;
    						else
    							BackMap[i][j] = 4;
    					} else {
    						if(Math.random() > 0.8)
    							BackMap[i][j] = 2;
    						else
    							BackMap[i][j] = 1;
    					}
    				}
    			}
    		}
    	}
    },

    actors: function() {
        if(ActorMap[1] == null && ActorMap[1] != "underfined") {
            for(var i = 0; i < ROWS; i++) {
                ActorMap[i] = new Array(COLS);
                for(var j = 0; j < COLS; j++) {
                    if(BackMap[i][j] == 1 || BackMap[i][j] == 2) {
                        if(Math.random() > 0.9) {
                            if(Math.random() > 0.5) {
                                ActorMap[i][j] = 1;

                                var actor = {
                                    name: "Rabbit Man",
                                    x: j,
                                    y: i
                                }
                            } else {
                                ActorMap[i][j] = 2;

                                var actor = {
                                    name: "Rabbit Woman",
                                    x: j,
                                    y: i
                                }
                            }

                            actorCoords[actor.y + "_" + actor.x] = actor;
    						actorList.push(actor);

                        } else if(Math.random() > 0.9) {
                            if(Math.random() > 0.5) {
                                ActorMap[i][j] = 3;

                                var actor = {
                                    name: "Volf Man",
                                    x: j,
                                    y: i
                                }
                            } else {
                                ActorMap[i][j] = 4;

                                var actor = {
                                    name: "Volf Woman",
                                    x: j,
                                    y: i
                                }
                            }

                            actorCoords[actor.y + "_" + actor.x] = actor;
    						actorList.push(actor);
                        }
                    }
                }
            }
        }
    }
}
