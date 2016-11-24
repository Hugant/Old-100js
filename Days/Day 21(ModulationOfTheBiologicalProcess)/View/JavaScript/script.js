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

var activeActors = {};
window.onclick = function gameLoop() {
    id = setInterval(function () {


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
                } else {
                    Actors[actor].hungry ? Actors[actor].age -= 4 : Actors[actor].age--;

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
            if(activeActors[actor].name.indexOf("Rabbit") > -1) {
                activeActors[actor].search();
                if(activeActors[actor].hungry) {
                    activeActors[actor].move(activeActors[actor].stepToFood());
                } else if(activeActors[actor].inLove) {
                    activeActors[actor].move(activeActors[actor].stepToLove());
                }
            }
        }

        for(var actor in activeActors) {
            if(activeActors[actor].name.indexOf("Volf") > -1) {
                activeActors[actor].search();
                if(activeActors[actor].hungry) {
                    activeActors[actor].move(activeActors[actor].stepToFood());
                } else if(activeActors[actor].inLove) {
                    activeActors[actor].move(activeActors[actor].stepToLove());
                }
            }
        }
        draw.world();
        generateGrass();
        outInfo();
        activeActors = {};
    },1000);
}

function generateGrass() {
    var numberGrass = Math.floor(Math.random() * 5);

    grass:
    while(numberGrass > 0) {
        var rI = Math.floor(Math.random() * 9);
        var rJ = Math.floor(Math.random() * 19);

        while(BackMap[rI][rJ] != 1) {
            if(rJ == 19) {
                rJ = 0;
                rI++;
            } else {
                rJ++;
            }

            if(rI > 9) {
                numberGrass--;
                continue grass;
            }
        }

        BackMap[rI][rJ] = 2;
        numberGrass--;
    }
}

function outInfo() {
    document.getElementById("outC").innerHTML = numberCreatures;
    document.getElementById("outR").innerHTML = numberRabbits;
    document.getElementById("outV").innerHTML = numberVolfs;
}
