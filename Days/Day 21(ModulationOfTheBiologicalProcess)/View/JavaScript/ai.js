
Rabbit.prototype.searchFood = function() {
    this.freeCells.splice(0, this.freeCells.length);
    this.food.splice(0, this.food.lenght);
    var count = 1;
    for(var i = this.y - 1; i < this.y + 2; i++) {
        for(var j = this.x - 1; j < this.x + 2; j++) {
            if(i >= 0 && i <= 9 && j >= 0 && j <= 19) {// исключаем границы карты
                if(BackMap[i][j] == 2 && (Actors[j + "_" + i] != null || Actors[j + "_" + i] == undefined)) {
                    this.food.push({x: j, y: i, steps: Math.abs(this.x - j) + Math.abs(this.y - i)});// добовляем в массив найденую еду
                }

                if(count % 2 == 0 &&
                  (Actors[j + "_" + i] != null || Actors[j + "_" + i] == undefined) &&
                  (BackMap[i][j] == 1 || BackMap[i][j] == 2)) {
                    this.freeCells.push({x: j, y: i});
                }
            }
            count++;
        }
    }

    this.food.sort(min);// сортируем по количеству шагов
}

Rabbit.prototype.stepToFood = function() {
    if(this.freeCells[0] == undefined) {
        return {x: 0, y: 0};
    } else if(this.food[0] == undefined) {
        var cell = Math.floor(Math.random() * this.freeCells.length);
        return {x: this.freeCells[cell].x - this.x, y: this.freeCells[cell].y - this.y};
    } else {
        for(var f in this.food) {
            if(this.food[f].steps == 0) {
                return {x: 0, y: 0};
            } else if(this.food[f].steps == 1) {
                return {x: this.food[f].x - this.x, y: this.food[f].y - this.y};
            } else if(this.food[f].steps == 2) {
                if(Math.random() > 0.5) {
                    if(BackMap[this.y][this.food[f].x] == 1 ||
                       BackMap[this.y][this.food[f].x] == 2) {
                           return {x: this.food[f].x - this.x, y: 0};
                    } else if(BackMap[this.food[f].y][this.x] == 1 ||
                              BackMap[this.food[f].y][this.x] == 2) {
                                  return {x: 0, y: this.food[f].y - this.y};
                    } else {
                        return this.freeCells[Math.floor(Math.random() * this.freeCells.length)];
                    }
                } else {
                    if(BackMap[this.food[f].y][this.x] == 1 ||
                       BackMap[this.food[f].y][this.x] == 2) {
                           return {x: 0, y: this.food[f].y - this.y};
                    } else if(BackMap[this.y][this.food[f].x] == 1 ||
                              BackMap[this.y][this.food[f].x] == 2) {
                                  return {x: this.food[f].x - this.x, y: 0};
                    } else {
                        return this.freeCells[Math.floor(Math.random() * this.freeCells.length)];
                    }
                }
            }
        }
    }
}

function min(a, b) {
    if(a.steps > b.steps) return 1;
    if(a.steps < b.steps) return -1;
}
