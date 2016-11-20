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
		for(var i = 0; i < ROWS; i++) {
			BackMap[i] = new Array(COLS);
			for(var j = 0; j < COLS; j++) {
				if(BackMap[i][j] == null) {
					if(Math.random() > 0.7) {
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

        /*BackMap[2][0] = 2;
        BackMap[2][1] = 4;
        BackMap[2][2] = 4;
        BackMap[2][3] = 2;
        BackMap[3][0] = 4;
        BackMap[3][1] = 1;
        BackMap[3][2] = 1;
        BackMap[3][3] = 4;
        BackMap[4][0] = 4;
        BackMap[4][1] = 1;
        BackMap[4][2] = 1;
        BackMap[4][3] = 4;
        BackMap[5][0] = 2;
        BackMap[5][1] = 4;
        BackMap[5][2] = 4;
        BackMap[5][3] = 2;*/
    },

    actors: function() {
        for(var i = 0; i < ROWS; i++) {
            for(var j = 0; j < COLS; j++) {
                if(BackMap[i][j] == 1 || BackMap[i][j] == 2) {
                    if(Math.random() > 0.9) {
                        if(Math.random() > 0.5) {
                            Actors[j + "_" + i] = new Rabbit(1, j, i);
                        } else {
                            Actors[j + "_" + i] = new Rabbit(0, j, i);
                        }
                    } else if(Math.random() > 0.9) {
                        if(Math.random() > 0.5) {
                            Actors[j + "_" + i] = new Volf(1, j, i);
                        } else {
                            Actors[j + "_" + i] = new Volf(0, j, i);
                        }
                    }
                }
            }
        }
        /*Actors[1 + "_" + 4] = new Volf(1, 1, 4);
        Actors[1 + "_" + 5] = new Volf(0, 1, 5);
        BackMap[5][0] = 3;
        BackMap[4][1] = 2;
        BackMap[5][1] = 2;*/
        /*Actors[3 + "_" + 5] = new Volf(0, 0, 3, 5);
        Actors[2 + "_" + 4] = new Volf(1, 0, 2, 4);*/
    }
}
