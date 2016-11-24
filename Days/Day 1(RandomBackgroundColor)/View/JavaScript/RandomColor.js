function randColor() {
    var color = Math.round(16777215 * Math.random());
    color = color.toString(16);
    document.body.style.background = "#" + color;
    document.getElementById("RandButton").style.background = "#" + color;
}

function setColor(color) {
    document.body.style.background = color;
    document.getElementById("RandButton").style.background = color;
}
