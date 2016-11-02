var mas = new Array(16);
var checkSwap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var checkStr = "12345678910111213141516";
var outStr = "";
var space = 0;
var win = 0;

function engine()
{
	space = mas.indexOf(16);
	fillBlock();
	addClassBlock();
	checkWin();
}

window.onload = function() {
	init();
	engine();
}

function init()
{
	for(var i = 0; i < mas.length; i++)
	{
		mas[i] = Math.floor(Math.random() * 16 + 1);
		for(var j = 0; j < mas.length; j++)
		{
			if(i != mas.length)
			{
				if(mas[j] == mas[i] && i != j)
				{
					i--;
					break;
				}
			}
		}
	}
}

function fillBlock()
{
	for(var i = 0; i < mas.length; i++)
	{
		if(mas[i] == 16)
			document.getElementById(i + 1).innerHTML = "&#1758;";
		else
			document.getElementById(i + 1).innerHTML = mas[i] + "";
	}
}

function addClassBlock()
{
	for(var i = 0; i < mas.length; i++)
	{
		if(mas.indexOf(mas[i]) + 1 == space || mas.indexOf(mas[i]) - 1 == space || mas.indexOf(mas[i]) - 4 == space || mas.indexOf(mas[i]) + 4 == space)
		{
			document.getElementById(i + 1).classList.remove("falseMove");
			document.getElementById(i + 1).classList.add("trueMove");
			checkSwap[i] = 1;
		}
		else
		{
			document.getElementById(i + 1).classList.remove("trueMove");
			document.getElementById(i + 1).classList.add("falseMove");
		}
	}
}

function swapBlock(firstBlock)
{
	if(!win)
	{
		var first = mas.indexOf(parseInt(firstBlock, 10));
		if(checkSwap[first])
		{
			var o = mas[first];
			mas[first] = mas[space];
			mas[space] = o;
			checkSwap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		}
		engine();
	}
}

function checkWin()
{
	for(var i = 0; i < mas.length; i++)
	{
		outStr += mas[i];
	}
	
	if(outStr == checkStr)
	{
		win = 1;
		document.getElementById("win").innerHTML = "You Win!!!";
	}
	outStr = "";
}