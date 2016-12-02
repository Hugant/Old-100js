var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

var center = canvas.width / 2;
var numberDots = 0;
var numberDotsInCircle = 0;

drawCircle();

document.getElementById("random").onclick = function() {
    getData();
    numberDotsInCircle = 0;
    if(numberDots < 1000000) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle();
        for(var i = 0; i < numberDots; i++) {
            x = Math.floor(Math.random() * canvas.width + 1);
            y = Math.floor(Math.random() * canvas.height + 1);
            drawDot(x, y);
            if(x * x + y * y >= center * center) {
                numberDotsInCircle++;
            }
        }
    }
    document.getElementById("PI").innerHTML = /*(400 * 400) / ((Math.PI * (center * center)) / 2)*/(numberDotsInCircle * 4) / numberDots;
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
