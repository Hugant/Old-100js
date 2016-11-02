

function CheckTime(time)
{
    if(time < 15)
        time = "0" + time;
    return time;
}

function CheckColor(color)
{
    if(color.length < 2)
        color = "0" + color;
    return color;
}

function time()
{
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    document.getElementById("hours").innerHTML = CheckTime(hours) + ":";
    document.getElementById("minutes").innerHTML = CheckTime(minutes) + ":";
    document.getElementById("seconds").innerHTML = CheckTime(seconds);

    var hoursC = Math.round(255 * (hours / 23));
    var minutesC = Math.round(255 * (minutes / 59));
    var secondsC = Math.round(255 * (seconds / 59));
    
    colorH = CheckColor(hoursC.toString(16)).toUpperCase();
    colorM = CheckColor(minutesC.toString(16)).toUpperCase();
    colorS = CheckColor(secondsC.toString(16)).toUpperCase();
    
    document.getElementById("ColorH").innerHTML = colorH;
    document.getElementById("ColorM").innerHTML = colorM;
    document.getElementById("ColorS").innerHTML = colorS;
    
    document.getElementById("body").style.backgroundColor = "#" + colorH + colorM + colorS;
}

setInterval(time,1000);
