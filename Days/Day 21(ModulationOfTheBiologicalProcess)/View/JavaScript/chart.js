var chart = document.getElementById("chart");
var Cctx = chart.getContext("2d");

chart.width = 750;
chart.height = 400;

var lengthOX = chart.width - 90;
var lengthOY = chart.height - 70;

var start = {
    x: 40.5,
    y: chart.height - (chart.height - 370.5)
};

var endOY = start.y - lengthOY;
var endOX = start.x + lengthOX;

var numberDividingY;
var numberDividingX;

var stepY;
var stepX;

function getData() {
    numberDividingX = ChartData.length;
    numberDividingY = getMax(ChartData);

    stepX = Math.floor(lengthOX / numberDividingX) + 0.5;
    stepY = Math.floor(lengthOY / numberDividingY) + 0.5;
}

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

function drawCreatures() {
    Cctx.strokeStyle = "green";
    Cctx.beginPath();
    Cctx.moveTo(start.x, start.y);
    for(var dot in ChartData) {
        Cctx.lineTo(dot * stepX + start.x, chart.height - (chart.height - start.y) - ChartData[dot].c * stepY);
        Cctx.moveTo(dot * stepX + start.x, chart.height - (chart.height - start.y) - ChartData[dot].c * stepY);
    }
    Cctx.closePath();
    Cctx.stroke();
}

function drawRabbits() {
    Cctx.strokeStyle = "blue";
    Cctx.beginPath();
    Cctx.moveTo(start.x, start.y);
    for(var dot in ChartData) {
        Cctx.lineTo(dot * stepX + start.x, chart.height - (chart.height - start.y) - ChartData[dot].r * stepY);
        Cctx.moveTo(dot * stepX + start.x, chart.height - (chart.height - start.y) - ChartData[dot].r * stepY);
    }
    Cctx.closePath();
    Cctx.stroke();
}

function drawVolfs() {
    Cctx.strokeStyle = "red";
    Cctx.beginPath();
    Cctx.moveTo(start.x, start.y);
    for(var dot in ChartData) {
        Cctx.lineTo(dot * stepX + start.x, chart.height - (chart.height - start.y) - ChartData[dot].v * stepY);
        Cctx.moveTo(dot * stepX + start.x, chart.height - (chart.height - start.y) - ChartData[dot].v * stepY);
    }
    Cctx.closePath();
    Cctx.stroke();
}

function drawLines() {
    drawCreatures();
    drawRabbits();
    drawVolfs();
}

function getMax(graph) {
    var max = 0;
    for(var d in graph) {
        if(graph[d].c > max)
            max = graph[d].c;
    }
    return max;
}



document.getElementById("getChart").onclick = function() {
    document.getElementById("chart").style.display = "block";
    Cctx.clearRect(0, 0, canvas.width, canvas.height);
    getData();
    drawAxis();
    drawDividing();
    drawLines();
}
