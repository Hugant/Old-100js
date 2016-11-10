var canvas = document.getElementById("canvas");// получаем элемент canvas
var context = canvas.getContext("2d");// получаем холст для рисования

canvas.width = 960;// ширина холста
canvas.height = 480;// высота холста

var ROWS = 10;// количество строк карты
var COLS = 20;// количество столбцов карты


var BackMap;// карта
var Actors = {};// волки, зайцы

var numberRabbits = 0;// общее количество зайцев
var numberVolfs = 0;// общее количество волков
var numberCreatures = 0;// общее количество животных

window.onload = function() {
    init.world();// генерируем мир
    gameLoop();// запускаем главный цикл игры
}


function gameLoop() {
    for(var actor in Actors) {
        if(Actors[actor] != null) {
            aiAct(Actors[actor]);
        }
    }
}

function canGo(actor, dir) { // запрет передвежения
	return actor.x + dir.x >= 0 &&
	actor.x + dir.x <= COLS - 1 &&
	actor.y + dir.y >= 0        &&
	actor.y + dir.y <= ROWS - 1 && // пределы карты
	( BackMap[actor.y + dir.y][actor.x + dir.x] == 1 ||// возможность ходить
	  BackMap[actor.y + dir.y][actor.x + dir.x] == 2 );// только на траву
}

function moveTo(actor, dir) {
    if(!canGo)// если не идти - отдыхаем
        return false;

    var newKey = (actor.x + dir.x) + "_" + (actor.y + dir.y);// новый ключ для сравнения

    if(/*Actors[newKey] != null*/ 0) {// если произошла атака
        var victim = Actors[newKey];// кого начили бить

        if(actor.name == "Rabbit") {

        } else if(actor.name == "Volf") {

        }
    } else {// если это передвижени или заяц ест траву
        if(newKey == (actor.x + "_" + actor.y)) {// если заяц съел траву
			actor.hungry = 0;// он теперь не голодный
            actor.inLove = 1;// может размножаться
			BackMap[actor.y][actor.x] = 1;// убераем траву с карты
			draw.place(actor.x, actor.y);// рисуем клетку карты
			draw.actor(actor);// рисуем зайца
		} else {// если это передвижение
            Actors[actor.x + "_" + actor.y] = null;// удаляем старое расположение
            Actors[(actor.x + dir.x) + "_" + (actor.y + dir.y)] = actor;// создаем новове расположение
            draw.step(actor, dir);// анимация перехода в другую клетку

        }
    }
}

function searchFood(actor) { // поиск еды
    if(actor.name == "Rabbit Man" || actor.name == "Rabbit Woman") { // если еду ищет заяц
        var rabbitFood = new Array();// массив со всей найденой едой
        for(var i = actor.y - 1; i < actor.y + 1; i++) {
            for(var j = actor.x - 1; j < actor.x + 1; j++) {
                if(i >= 0) {// исключаем границы карты
                    if(BackMap[i][j] == 2) {
                        rabbitFood.push({x: j, y: i, steps: (actor.x + actor.y) - (j + i)});// добовляем в массив найденую еду
                    }
                }
            }
        }

        var minSteps = null;
        for(var food in rabbitFood) { // ищем кройчайший путь
            if(Math.abs(rabbitFood[food].steps) < 17) {
                // исключаем ситуации если на клетках уже присутствуют другие животные
                if(!((Actors[rabbitFood[food].x + "_" + rabbitFood[food].y] != null && Actors[rabbitFood[food].x + "_" + rabbitFood[food].y].name == "Volf Man")         ||
                     (Actors[rabbitFood[food].x + "_" + rabbitFood[food].y] != null && Actors[rabbitFood[food].x + "_" + rabbitFood[food].y].name == "Volf Woman")       ||
                     (Actors[rabbitFood[food].x + "_" + rabbitFood[food].y] != null && Actors[rabbitFood[food].x + "_" + rabbitFood[food].y].name == "Rabbit Man")       ||
                     (Actors[rabbitFood[food].x + "_" + rabbitFood[food].y] != null && Actors[rabbitFood[food].x + "_" + rabbitFood[food].y].name == "Rabbit Woman")     )) {
                         minSteps = rabbitFood[food];
                }
            }
        }

        if(minSteps == null) {// если заяц не нашел еду
            var k = 1;

            for(var i = actor.y - 1; i < actor.y + 1; i++) {
                for(var j = actor.x - 1; j < actor.x + 1; j++) {
                    if(k % 2 == 0) {
                        if(!((Actors[j + "_" + i] != null && Actors[j + "_" + i].name == "Volf Man")         ||
                             (Actors[j + "_" + i] != null && Actors[j + "_" + i].name == "Volf Woman")       ||
                             (Actors[j + "_" + i] != null && Actors[j + "_" + i].name == "Rabbit Man")       ||
                             (Actors[j + "_" + i] != null && Actors[j + "_" + i].name == "Rabbit Woman")     )) {
                                 moveTo(actor, {x: actor.x - j, y: actor.y - i})
                        }
                    }
                    k++;
                }
            }
        } else {
            if((dx = Math.abs(actor.x - minSteps.x)) > (dy = Math.abs(actor.y - minSteps.y))) {
        		if(dx < 0) {
        			moveTo(actor, { x: -1, y: 0});
        		} else {
        			moveTo(actor, { x: 1, y: 0});
        		}
        	} else if(dx < dy) {
        		if(dy < 0) {
        			moveTo(actor, { x: 0, y: -1});
        		} else {
        			moveTo(actor, { x: 0, y: 1});
        		}
        	} else {
                moveTo(actor, {x: 0, y: 0})
            }
        }

    } else if(actor.name == "Volf Man" || actor.name == "Volf Woman") {

    }
}

function aiAct(actor) {
    searchFood(actor);
}
