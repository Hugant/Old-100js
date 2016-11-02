var marginTop = -100;
var marginLeft = -100;

function stop()
{
    if(marginTop <= -360)
        document.getElementById("HPbutton").style.backgroundColor = "red";
    else
       document.getElementById("HPbutton").style.backgroundColor = "#b3b3b3"; 
    
    if(marginTop >= 260)
        document.getElementById("HMbutton").style.backgroundColor = "red";
    else
       document.getElementById("HMbutton").style.backgroundColor = "#b3b3b3";
    
    if(marginLeft <= -360)
        document.getElementById("WPbutton").style.backgroundColor = "red";
    else
       document.getElementById("WPbutton").style.backgroundColor = "#b3b3b3"; 
    
    if(marginLeft >= 260)
        document.getElementById("WMbutton").style.backgroundColor = "red";
    else
       document.getElementById("WMbutton").style.backgroundColor = "#b3b3b3";
        
}

function Up()
{
    if(marginTop > -360)
    {
        document.getElementById("block").style.marginTop = marginTop - 20 + "px"; 
        marginTop = marginTop - 20;
    }
    stop();
}

function Down()
{
    if(marginTop < 260)
    {
        document.getElementById("block").style.marginTop = marginTop + 20 + "px"; 
        marginTop = marginTop + 20;
    }
    stop();
}

function Left()
{
    if(marginLeft > -360)
    {
       document.getElementById("block").style.marginLeft = marginLeft - 20 + "px"; 
       marginLeft = marginLeft - 20; 
    }
    stop();
}

function Right()
{
    if(marginLeft < 260)
    {
        document.getElementById("block").style.marginLeft = marginLeft + 20 + "px"; 
        marginLeft = marginLeft + 20;
    }
    stop();
}