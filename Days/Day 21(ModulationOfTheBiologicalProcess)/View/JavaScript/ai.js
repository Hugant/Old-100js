
Rabbit.prototype.search = function() {
    this.freeCells.splice(0, this.freeCells.length);
    this.food.splice(0, this.food.length);
    this.fans.splice(0, this.fans.length);
    var count = 1;
    for(var i = this.y - 1; i < this.y + 2; i++) {
        for(var j = this.x - 1; j < this.x + 2; j++) {
            if(i >= 0 && i <= 9 && j >= 0 && j <= 19) {// исключаем границы карты
                var object = Actors[j + "_" + i];

                if(this.hungry) {
                    if(BackMap[i][j] == 2) {
                        if(i == this.y && j == this.x) {
                            this.food.push({x: j, y: i, steps: 0});
                        } else if(object == null) {
                            this.food.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});
                        }
                    }

                    if(count % 2 == 0 && object === null && BackMap[i][j] < 3) {
                        this.freeCells.push({x: j, y: i});
                    }
                } else if(this.inLove) {
                    if(this.name == "Rabbit Man") {
                        if(object != null && object.name == "Rabbit Woman" &&
                           object.inLove) {
                               this.fans.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});
                        }

                        if(count % 2 == 0 && BackMap[i][j] < 3 && (object == null ||
                          (object.name == "Rabbit Woman" && object.inLove))) {
                               this.freeCells.push({x: j, y: i});
                        }
                    } else {
                        if(count % 2 == 0 && BackMap[i][j] < 3 &&
                          (object == null || (object.name == "Rabbit Man" &&
                           object.inLove))) {
                               this.freeCells.push({x: j, y: i});
                        }
                    }
                }
            }
            count++;
        }
    }
    this.food.sort(min);// сортируем по количеству шагов
}

Volf.prototype.search = function() {
    this.freeCells.splice(0, this.freeCells.length);
    this.food.splice(0, this.food.length);
    this.fans.splice(0, this.fans.length);
    var count = 1;
    for(var i = this.y - 1; i < this.y + 2; i++) {
        for(var j = this.x - 1; j < this.x + 2; j++) {
            if(i >= 0 && i <= 9 && j >= 0 && j <= 19) {// исключаем границы карты
                var object = Actors[j + "_" + i];
                if(this.hungry) {
                    if(object != null && (object.name.indexOf("Rabbit") > -1)) {
                        this.food.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});// добовляем в массив найденую еду
                    }

                    if(count % 2 == 0 && BackMap[i][j] < 3) {
                          if(object == null || object.name.indexOf("Rabbit") > -1) {
                              this.freeCells.push({x: j, y: i});
                          }
                    }
                } else if(this.inLove) {
                    if(this.name == "Volf Man") {
                        if(object != null && object.name == "Volf Woman" &&
                           object.inLove) {
                               this.fans.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});
                        }

                        if(count % 2 == 0 && BackMap[i][j] < 3 &&
                          (object == null || (object.name == "Volf Woman" &&
                           object.inLove))) {
                               this.freeCells.push({x: j, y: i});
                        }
                    } else {
                        if(count % 2 == 0 && BackMap[i][j] < 3 &&
                          (object == null || (object.name == "Volf Man" &&
                           object.inLove))) {
                               this.freeCells.push({x: j, y: i});
                        }
                    }
                }
            }
            count++;
        }
    }
    this.food.sort(min);// сортируем по количеству шагов
}

function stepToFood() {
    if(this.freeCells.length < 1) {
        return {x: 0, y: 0};
    } else if(this.food.length < 1) {
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
    if(this.name.indexOf("Woman") > -1) {
        if(this.freeCells.length < 1) {
            return {x: 0, y: 0};
        } else {
            for(var cell in this.freeCells) {
                if(Actors[this.freeCells[cell].x + "_" + this.freeCells[cell].y] != null) {
                    if(this.name == "Rabbit Woman") {
                        if(Actors[this.freeCells[cell].x + "_" + this.freeCells[cell].y].name == "Rabbit Man") {
                            return {x: 0, y: 0};
                        }
                    } else if(this.name == "Volf Woman") {
                        if(Actors[this.freeCells[cell].x + "_" + this.freeCells[cell].y].name == "Volf Man") {
                            return {x: 0, y: 0};
                        }
                    }
                }
            }
        }

        var cell = Math.floor(Math.random() * this.freeCells.length);
        return {x: this.freeCells[cell].x - this.x, y: this.freeCells[cell].y - this.y};

    } else if(this.name == "Rabbit Man" || this.name == "Volf Man") {
        if(this.freeCells.length == 0) {
            return {x: 0, y: 0};
        } else if(this.fans.length == 0) {
            var cell = Math.floor(Math.random() * this.freeCells.length);
            return {x: this.freeCells[cell].x - this.x, y: this.freeCells[cell].y - this.y};
        } else {
            for(var fan in this.fans) {
                switch(this.fans[fan].steps) {
                    case 1:
                        for(var cell in this.freeCells) {
                            if(this.freeCells[cell].x == this.fans[fan].x &&
                               this.freeCells[cell].y == this.fans[fan].y) {
                                   return {x: this.fans[fan].x - this.x, y: this.fans[fan].y - this.y};
                            }
                        }
                        continue;

                    case 2:
                        if(Math.random() > 0.5) {
                            for(var cell in this.freeCells) {
                                if((this.freeCells[cell].x == this.fans[fan].x) &&
                                   (this.freeCells[cell].y == (this.fans[fan].y - (this.fans[fan].y - this.y)))) {
                                       return {x: this.fans[fan].x - this.x, y: 0};
                                }
                            }

                            for(var cell in this.freeCells) {
                                if(this.freeCells[cell].x == (this.fans[fan].x - (this.fans[fan].x - this.x)) &&
                                   this.freeCells[cell].y == this.fans[fan].y) {
                                       return {x: 0, y: this.fans[fan].y - this.y};
                                }
                            }
                        } else {
                            for(var cell in this.freeCells) {
                                if(this.freeCells[cell].x == (this.fans[fan].x - (this.fans[fan].x - this.x)) &&
                                   this.freeCells[cell].y == this.fans[fan].y) {
                                       return {x: 0, y: this.fans[fan].y - this.y};
                                }
                            }

                            for(var cell in this.freeCells) {
                                if((this.freeCells[cell].x == this.fans[fan].x) &&
                                   (this.freeCells[cell].y == (this.fans[fan].y - (this.fans[fan].y - this.y)))) {
                                       return {x: this.fans[fan].x - this.x, y: 0};
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
}

function move(dir) {
    var newKey = (this.x + dir.x) + "_" + (this.y + dir.y);
    this.direction = getDirection(dir);

    if(Actors[newKey] != null) {
        var victim = Actors[newKey];

        if(this.name.indexOf("Rabbit") > -1) {
            if(victim.name == "Rabbit Woman" && this.name == "Rabbit Man") {
                this.direction = getAttackDirection(dir);
                var numberChild = Math.floor(Math.random() * 4 + 1);
                victim.inLove = 0;
                victim.notHungry = 1;
                this.inLove = 0;
                this.hungry = 1;
                var k = 1;
                for(var i = victim.y - 1; i < victim.y + 2; i++) {
                    for(var j = victim.x - 1; j < victim.x + 2; j++) {
                        if(i >= 0 && i <= 9 && j >= 0 && j <= 19) {
                            if(numberChild > 0) {
                                if(k % 2 == 0) {
                                    if(BackMap[i][j] < 2 && Actors[j + "_" + i] == null) {
                                        Actors[j + "_" + i] = new Rabbit(Math.random() > 0.5 ? 1: 0, j, i);
                                    }
                                    numberChild--;
                                }
                            }
                        }
                        k++;
                    }
                }
            } else if(BackMap[this.y][this.x] == 2 && this.hungry) {
                this.hungry = 0;
                this.notHungry = 5;
                this.inLove = 1;
                BackMap[this.y][this.x] = 1;
            }
        } else if(this.name.indexOf("Volf") > -1) {
            if(this.name == "Volf Man" && victim.name == "Volf Woman") {
                this.direction = getAttackDirection(dir);
                var numberChild = 1;
                victim.inLove = 0;
                victim.notHungry = 1;
                this.inLove = 0;
                this.hungry = 1;
                var k = 1;
                for(var i = victim.y - 1; i < victim.y + 2; i++) {
                    for(var j = victim.x - 1; j < victim.x + 2; j++) {
                        if(i >= 0 && i <= 9 && j >= 0 && j <= 19) {
                            if(numberChild > 0) {
                                if(k % 2 == 0) {
                                    if(BackMap[i][j] < 2 && Actors[j + "_" + i] == null) {
                                        Actors[j + "_" + i] = new Volf(Math.random() > 0.5 ? 1: 0, j, i);
                                        numberChild--;
                                    }
                                }
                            }
                        }
                        k++;
                    }
                }
            } else if(victim.name.indexOf("Rabbit") > -1) {
                this.x += dir.x;
                this.y += dir.y;
                this.hungry = 0;
                this.notHungry = 5;
                this.inLove = 1;
                Actors[this.x + "_" + this.y] = this;
                Actors[(this.x - dir.x) + "_" + (this.y - dir.y)] = null;
                numberRabbits--;
                numberCreatures--;
            }
        }
    } else {
        Actors[this.x + "_" + this.y] = null;// удаляем старое местоположение
        this.x += dir.x;// новые координаты
        this.y += dir.y;
        Actors[this.x + "_" + this.y] = this;// новое местоположение
    }
}

Rabbit.prototype.stepToFood = stepToFood;
Volf.prototype.stepToFood = stepToFood;

Rabbit.prototype.stepToLove = stepToLove;
Volf.prototype.stepToLove = stepToLove;

Rabbit.prototype.move = move;
Volf.prototype.move = move;

function min(a, b) {
    if(a.steps > b.steps) return 1;
    if(a.steps < b.steps) return -1;
}

function getDirection(dir) {
    if(dir.x > 0){
        return 2;
    } else if(dir.x < 0) {
        return 4;
    } else {
        if(dir.y > 0) {
            return 3;
        } else if(dir.y < 0) {
            return 1;
        } else {
            return 0;
        }
    }
}

function getAttackDirection(dir) {
    if(dir.x > 0){
        return 6;
    } else if(dir.x < 0) {
        return 8;
    } else {
        if(dir.y > 0) {
            return 7;
        } else if(dir.y < 0) {
            return 5;
        } else {
            return 0;
        }
    }
}
