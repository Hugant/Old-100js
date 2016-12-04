var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

var center = canvas.width / 2;
var numberDots = 0;
var numberDotsInCircle = 0;
var radius = 1;

drawCircle();

document.getElementById("random").onclick = function() {
    getData();
    numberDotsInCircle = 0;
    if(numberDots < 1000000) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle();
        for(var i = 0; i < numberDots; i++) {
            x = Math.random();
            y = Math.random();
            drawDot(Math.floor(x * canvas.width), Math.floor(y * canvas.height));
            if(x * x + y * y <= radius * radius) {
                numberDotsInCircle++;
            }
        }
    }
    document.getElementById("PI").innerHTML = (numberDotsInCircle * 4) / numberDots;
}

function getData() {
    numberDots = document.getElementById("input").value;
}

function drawDot(x, y) {
    context.fillStyle = 'blue';
    context.fillRect(x, y , 1, 1);
}

function drawCircle() {
    context.strokeStyle = 'red';
    context.beginPath();
    context.arc(center, center, center, 0, Math.PI * 2);
    context.stroke();
}
