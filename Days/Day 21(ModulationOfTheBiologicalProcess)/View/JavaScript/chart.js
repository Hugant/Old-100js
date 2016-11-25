var chart = document.getElementById("chart");
var Cctx = chart.getContext("2d");

chart.width = 750;
chart.height = 400;

var graph = {
    1: {c: 12, r: 4, v: 8},
    2: {c: 13, r: 5, v: 8},
    3: {c: 11, r: 4, v: 7},
    4: {c: 19, r: 10, v: 9},
    6: {c: 14, r: 9, v: 8},
    7: {c: 11, r: 9, v: 8},
    8: {c: 15, r: 9, v: 8},
    9: {c: 13, r: 9, v: 8},
    10: {c: 16, r: 9, v: 8},
    11: {c: 19, r: 9, v: 8},
    12: {c: 1, r: 9, v: 8},
    13: {c: 14, r: 9, v: 8},
    14: {c: 18, r: 9, v: 8},
    15: {c: 20, r: 5, v: 8}
};

var lengthOX = 660;
var lengthOY = 330;
var start = {
    x: 40.5,
    y: 370.5
};

var endOY = start.y - lengthOY;
var endOX = start.x + lengthOX;

var numberDividingX = Object.keys(graph).length;
var numberDividingY = getMax(graph);

var stepX = Math.floor(lengthOX / numberDividingX) + 0.5;
var stepY = Math.floor(lengthOY / numberDividingY) + 0.5;

function drawAxis() {
    Cctx.strokeStyle = "white";
    Cctx.beginPath();
    Cctx.moveTo(start.x, start.y);
    Cctx.lineTo(start.x, endOY);
    Cctx.moveTo(start.x, endOY);
    Cctx.lineTo(start.x - 4, endOY + 14);
    Cctx.moveTo(start.x, endOY);
    Cctx.lineTo(start.x + 4, endOY + 14);

    Cctx.moveTo(start.x, start.y);
    Cctx.lineTo(endOX, start.y);
    Cctx.moveTo(endOX, start.y);
    Cctx.lineTo(endOX - 14, start.y - 4);
    Cctx.moveTo(endOX, 370.5);
    Cctx.lineTo(endOX - 14, start.y + 4);

    Cctx.closePath();
    Cctx.stroke();
}

function drawDividing() {
    Cctx.strokeStyle = "white";
    Cctx.beginPath();
    for(var i = start.x + stepX; i < lengthOX; i += stepX) {
        Cctx.moveTo(i, start.y - 5);
        Cctx.lineTo(i, start.y + 5);
    }

    for(var i = start.y - stepY; i > endOY + stepY; i -= stepY) {
        Cctx.moveTo(start.x - 5, i);
        Cctx.lineTo(start.x + 5, i);
    }
    Cctx.closePath();
    Cctx.stroke();
}

function drawLines() {
    Cctx.strokeStyle = "lightgreen";
    Cctx.beginPath();
    for(var dot in graph) {
        if(graph[dot + 1] != null) {
            Cctx.moveTo(dot * stepX + start.x, graph[dot].c * stepY / 2);
            Cctx.lineTo((dot + 1) * stepX + start.x, graph[dot + 1].c * stepY / 2);
        }
    }
    Cctx.closePath();
    Cctx.stroke();
}

drawAxis();
drawDividing();
drawLines();


function getMax(graph) {
    var max = 0;
    for(var d in graph) {
        if(graph[d].c > max)
            max = graph[d].c;
    }
    return max;
}
