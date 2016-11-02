function randColor()
{
    color = Math.round(255*Math.random());
    R = color.toString(16);
    color = Math.round(255*Math.random());
    G = color.toString(16);
    color = Math.round(255*Math.random());
    B = color.toString(16);
    Color = R + G + B;
    document.getElementById("body").style.background = "#" + Color;
    document.getElementById("RandButton").style.background = "#" + Color;
}

function redColor()
{
    document.getElementById("body").style.background = "red";
    document.getElementById("RandButton").style.background = "red";
}

function yellowColor()
{
    document.getElementById("body").style.background = "yellow";
    document.getElementById("RandButton").style.background = "yellow";
}

function blueColor()
{
    document.getElementById("body").style.background = "blue";
    document.getElementById("RandButton").style.background = "blue";
}

function pinkColor()
{
    document.getElementById("body").style.background = "pink";
    document.getElementById("RandButton").style.background = "pink";
}

function aquaColor()
{
    document.getElementById("body").style.background = "aqua";
    document.getElementById("RandButton").style.background = "aqua";
}

function orangeColor()
{
    document.getElementById("body").style.background = "orange";
    document.getElementById("RandButton").style.background = "orange";
}

function greenColor()
{
    document.getElementById("body").style.background = "green";
    document.getElementById("RandButton").style.background = "green";
}

function brownColor()
{
    document.getElementById("body").style.background = "brown";
    document.getElementById("RandButton").style.background = "brown";
}