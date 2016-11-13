
Rabbit.prototype.searchFood = function() {
    this.freeCells.splice(0, this.freeCells.length);
    this.food.splice(0, this.food.length);
    var count = 1;
    for(var i = this.y - 1; i < this.y + 2; i++) {
        for(var j = this.x - 1; j < this.x + 2; j++) {
            if(i >= 0 && i <= 9 && j >= 0 && j <= 19) {// исключаем границы карты
                if((i == this.y && j == this.x) && BackMap[i][j] == 2) {
                    this.food.push({x: j, y: i, steps: 0});
                } else if(BackMap[i][j] == 2 && Actors[j + "_" + i] == null) {
                    this.food.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});// добовляем в массив найденую еду
                }

                if(count % 2 == 0 &&
                  Actors[j + "_" + i] == null &&
                  (BackMap[i][j] == 1 || BackMap[i][j] == 2)) {
                    this.freeCells.push({x: j, y: i});
                }

                if(Actors[j + "_" + i] != null &&
                   Actors[j + "_" + i].name == "Rabbit " + (Actors[j + "_" + i].sex ? "Woman" : "Man")) {
                       this.fans.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});
                }
            }
            count++;
        }
    }
    this.food.sort(min);// сортируем по количеству шагов
}

Volf.prototype.searchFood = function() {
    this.freeCells.splice(0, this.freeCells.length);
    this.food.splice(0, this.food.length);
    var count = 1;
    for(var i = this.y - 1; i < this.y + 2; i++) {
        for(var j = this.x - 1; j < this.x + 2; j++) {
            if(i >= 0 && i <= 9 && j >= 0 && j <= 19) {// исключаем границы карты
                if(Actors[j + "_" + i] != null               &&
                  (Actors[j + "_" + i].name == "Rabbit Man"  ||
                   Actors[j + "_" + i].name == "Rabbit Woman")) {
                    this.food.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});// добовляем в массив найденую еду
                }

                if(count % 2 == 0                               &&
                  (BackMap[i][j] == 1 || BackMap[i][j] == 2)    &&
                  (Actors[j + "_" + i] == null)                 ||
                  (Actors[j + "_" + i] != null                  &&
                  (Actors[j + "_" + i].name == "Rabbit Man"     ||
                   Actors[j + "_" + i].name == "Rabbit Woman"))) {
                       this.freeCells.push({x: j, y: i});
                }

                if(Actors[j + "_" + i] != null &&
                   Actors[j + "_" + i].name == "Volf " + (Actors[j + "_" + i].sex ? "Woman" : "Man")) {
                       this.fans.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});
                }
            }
            count++;
        }
    }
    this.food.sort(min);// сортируем по количеству шагов
}

function stepToFood() {
    if(this.freeCells[0] == undefined) {
        return {x: 0, y: 0};
    } else if(this.food[0] == undefined) {
        var cell = Math.floor(Math.random() * this.freeCells.length);
        return {x: this.freeCells[cell].x - this.x, y: this.freeCells[cell].y - this.y};
    } else {
        for(var f in this.food) {
            switch(this.food[f].steps) {
                case 0:
                    return {x: 0, y: 0};

                case 1:
                    for(var cell in this.freeCells) {
                        if(this.freeCells[cell].x == this.food[f].x &&
                           this.freeCells[cell].y == this.food[f].y) {
                               return {x: this.food[f].x - this.x, y: this.food[f].y - this.y};
                        }
                    }
                    continue;

                case 2:
                    if(Math.random() > 0.5) {
                        for(var cell in this.freeCells) {
                            if((this.freeCells[cell].x == this.food[f].x) &&
                               (this.freeCells[cell].y == (this.food[f].y - (this.food[f].y - this.y)))) {
                                   return {x: this.food[f].x - this.x, y: 0};
                            }
                        }

                        for(var cell in this.freeCells) {
                            if(this.freeCells[cell].x == (this.food[f].x - (this.food[f].x - this.x)) &&
                               this.freeCells[cell].y == this.food[f].y) {
                                   return {x: 0, y: this.food[f].y - this.y};
                            }
                        }
                    } else {
                        for(var cell in this.freeCells) {
                            if(this.freeCells[cell].x == (this.food[f].x - (this.food[f].x - this.x)) &&
                               this.freeCells[cell].y == this.food[f].y) {
                                   return {x: 0, y: this.food[f].y - this.y};
                            }
                        }

                        for(var cell in this.freeCells) {
                            if((this.freeCells[cell].x == this.food[f].x) &&
                               (this.freeCells[cell].y == (this.food[f].y - (this.food[f].y - this.y)))) {
                                   return {x: this.food[f].x - this.x, y: 0};
                            }
                        }
                    }
                    continue;
            }
        }

        var cell = Math.floor(Math.random() * this.freeCells.length);
        return {x: this.freeCells[cell].x - this.x, y: this.freeCells[cell].y - this.y};
    }
}

function stepToLove() {
    if(this.freeCells[0] == undefined) {
        return {x: 0, y: 0};
    } else if(this.fans[0] == undefined) {
        var cell = Math.floor(Math.random() * this.freeCells.length);
        return {x: this.freeCells[cell].x - this.x, y: this.freeCells[cell].y - this.y};
    } else {
        for(var f in this.funs) {
            switch(this.funs[f].steps) {
                case 0:
                    return {x: 0, y: 0};

                case 1:
                    for(var cell in this.freeCells) {
                        if(this.freeCells[cell].x == this.fans[f].x &&
                           this.freeCells[cell].y == this.fans[f].y) {
                               return {x: this.fans[f].x - this.x, y: this.fans[f].y - this.y};
                        }
                    }
                    continue;

                case 2:
                    if(Math.random() > 0.5) {
                        for(var cell in this.freeCells) {
                            if((this.freeCells[cell].x == this.fans[f].x) &&
                               (this.freeCells[cell].y == (this.fans[f].y - (this.fans[f].y - this.y)))) {
                                   return {x: this.fans[f].x - this.x, y: 0};
                            }
                        }

                        for(var cell in this.freeCells) {
                            if(this.freeCells[cell].x == (this.fans[f].x - (this.fans[f].x - this.x)) &&
                               this.freeCells[cell].y == this.fans[f].y) {
                                   return {x: 0, y: this.fans[f].y - this.y};
                            }
                        }
                    } else {
                        for(var cell in this.freeCells) {
                            if(this.freeCells[cell].x == (this.fans[f].x - (this.fans[f].x - this.x)) &&
                               this.freeCells[cell].y == this.fans[f].y) {
                                   return {x: 0, y: this.fans[f].y - this.y};
                            }
                        }

                        for(var cell in this.freeCells) {
                            if((this.freeCells[cell].x == this.fans[f].x) &&
                               (this.freeCells[cell].y == (this.fans[f].y - (this.fans[f].y - this.y)))) {
                                   return {x: this.fans[f].x - this.x, y: 0};
                            }
                        }
                    }
                    continue;
            }
        }

        var cell = Math.floor(Math.random() * this.freeCells.length);
        return {x: this.freeCells[cell].x - this.x, y: this.freeCells[cell].y - this.y};
    }
}

Rabbit.prototype.stepToFood = stepToFood;
Volf.prototype.stepToFood = stepToFood;

function min(a, b) {
    if(a.steps > b.steps) return 1;
    if(a.steps < b.steps) return -1;
}
