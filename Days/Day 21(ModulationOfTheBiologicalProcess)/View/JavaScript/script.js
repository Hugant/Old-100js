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
    document.getElementById("outC").innerHTML = numberCreatures;
    document.getElementById("outR").innerHTML = numberRabbits;
    document.getElementById("outV").innerHTML = numberVolfs;
    gameLoop();
}


window.onclick = function gameLoop() {
    id = setInterval(function () {
    var activeActors = {};

    for(var actor in Actors) {
        if(Actors[actor] != null) {
            if(Actors[actor].age <= 0) {
                if(Actors[actor].name.indexOf("Rabbit") > -1) {
                    numberRabbits--;
                } else {
                    numberVolfs--;
                }
                numberCreatures--;

                Actors[actor] = null;
                draw.map();
            } else {
                Actors[actor].hungry ? Actors[actor].age -= 2 : Actors[actor].age--;

                if(Actors[actor].notHungry != 0 && !Actors[actor].hungry) {
                    Actors[actor].notHungry--;
                } else {
                    Actors[actor].hungry = 1;
                    Actors[actor].inLove = 0;
                }

                activeActors[actor] = Actors[actor];
            }
        }
    }

    for(var actor in activeActors) {
            //console.log(actor);
            Actors[actor].search();
            //if(Actors[actor].hungry == 1) {
                moveTo(Actors[actor], Actors[actor].stepToFood());
            //}

            //if(Actors[actor].inLove == 1) {
            //    moveTo(Actors[actor], Actors[actor].stepToLove());
            //}
    }

    document.getElementById("outC").innerHTML = numberCreatures;
    document.getElementById("outR").innerHTML = numberRabbits;
    document.getElementById("outV").innerHTML = numberVolfs;
    activeActors = {};
},1500);
}

function moveTo(actor, dir) {
    var newKey = (actor.x + dir.x) + "_" + (actor.y + dir.y);// новый ключ для сравнения

    if(Actors[newKey] != null) {// если произошла атака
        var victim = Actors[newKey];// кого начили бить

        if(actor.name.indexOf("Rabbit") > -1) {
            if(victim.name == "Rabbit Woman" && actor.name == "Rabbit Man") {
                if(victim.inLove && actor.parent != victim.id) {
                    setTimeout(function() {
                        draw.attackStep(actor, dir);
                        var numberChild = Math.floor(Math.random() * 4  + 1);
                        console.log(victim.freeCells);
                        for(var cell in victim.freeCells) {
                            if(numberChild > 0) {
                                Actors[victim.freeCells[cell].x + "_" + victim.freeCells[cell].y] =
                                new Rabbit(Math.random() > 0.5 ? 1 : 0, victim.id, victim.freeCells[cell].x, victim.freeCells[cell].y);
                                draw.actors();
                                numberChild--;
                                victim.inLove = 0;
                                actor.inLove = 0;
                            }
                        }
                    }, 100);
                } else {
                    draw.place(actor.x, actor.y);// рисуем клетку карты
                    draw.actor(actor);
                }
            } else if(BackMap[actor.y][actor.x] < 2){
                draw.place(actor.x, actor.y);// рисуем клетку карты
                draw.actor(actor);
            } else {
                actor.hungry = 0;// он теперь не голодный
                actor.notHungry = 5;
                actor.inLove = 1;// может размножаться
                BackMap[actor.y][actor.x] = 1;// убираем траву с карты
                draw.place(actor.x, actor.y);// рисуем клетку карты
                draw.actor(actor);// рисуем зайца
            }
        } else if(actor.name.indexOf("Volf") > -1) {
            if(victim.name.indexOf("Rabbit") > -1) {
                Actors[actor.x + "_" + actor.y] = null;// удаляем старое расположение
                Actors[(actor.x + dir.x) + "_" + (actor.y + dir.y)] = actor;// создаем новове расположение
                draw.step(actor, dir);// анимация перехода в другую клетку
                actor.x = actor.x + dir.x;
                actor.y = actor.y + dir.y;
                actor.hungry = 0;
                actor.notHungry = 5;
                actor.inLove = 1;
                numberRabbits--;
                numberCreatures--;
            } else {
                draw.place(actor.x, actor.y);
                draw.actor(actor);
            }
        }
    } else {// если это передвижени или заяц ест траву
        Actors[actor.x + "_" + actor.y] = null;// удаляем старое расположение
        Actors[(actor.x + dir.x) + "_" + (actor.y + dir.y)] = actor;// создаем новове расположение
        draw.step(actor, dir);// анимация перехода в другую клетку
        actor.x = actor.x + dir.x;
        actor.y = actor.y + dir.y;
    }
}
