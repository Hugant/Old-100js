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
    },

    actors: function() {
        for(var i = 0; i < ROWS; i++) {
            for(var j = 0; j < COLS; j++) {
                if(BackMap[i][j] == 1 || BackMap[i][j] == 2) {
                    if(Math.random() > 0.9) {
                        if(Math.random() > 0.5) {
                            Actors[j + "_" + i] = new Rabbit(1, {dad: 0, mom: 0}, j, i);
                        } else {
                            Actors[j + "_" + i] = new Rabbit(0, {dad: 0, mom: 0}, j, i);
                        }
                    } /*else if(Math.random() > 0.9) {
                        if(Math.random() > 0.5) {
                            Actors[j + "_" + i] = new Volf(1, {dad: 0, mom: 0}, j, i);
                        } else {
                            Actors[j + "_" + i] = new Volf(0, {dad: 0, mom: 0}, j, i);
                        }
                    }*/
                }
            }
        }
        //Actors[0 + "_" + 4] = new Rabbit(1, {dad: 0, mom: 0}, 0, 4);
        //Actors[0 + "_" + 5] = new Rabbit(0, {dad: 0, mom: 0}, 0, 5);
        //Actors[3 + "_" + 5] = new Rabbit(0, {dad: 0, mom: 0}, 3, 5);
    }
}
