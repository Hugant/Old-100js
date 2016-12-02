var days = new Array();
var colors = [  "FF6CDB",
				"626FE8",
				"78FFD5",
				"C4E862",
				"FFC76B",
				"8EFF7C",
				"E86E5F",
				"BC75FF",
				"5FBEE8",
				"68FF70",
				"8b008b",
				"16A085"];
var count = 0;
var numberDay = 1;

function Block(firstString, secondString, link)
{
	this.firstString = firstString;
	this.secondString = secondString;
	this.viewLink = "Days/Day " + numberDay + "(" + link + ")/View/Day" + numberDay + ".html";
	this.codeLink = "Days/Day " + numberDay + "(" + link + ")/Code/Day" + numberDay + ".html";
	this.color = colors[count];
	count++;
	numberDay++;
	
	if(count == 12)
		count = 0;
}

days.push(new Block("Random", "background color", "RandomBackgroundColor"));
days.push(new Block("The", "moving block", "TheMovingBlock"));
days.push(new Block("Mini", "quiz", "MiniQuiz"));
days.push(new Block("Piano", "roll", "PianoRoll"));
days.push(new Block("The colors of", "the day", "TheColorsOfTheDay"));
days.push(new Block("Travel by", "color", "TravelByColor"));
days.push(new Block("Russian", "roulette", "RussianRoulette"));
days.push(new Block("Enter your", "phone number", "EnterYourPhoneNumber"));
days.push(new Block("Wheather", "conditions", "WeatherConditions"));
days.push(new Block("Roguelike game", "(Beta)", "RoguelikeGameBeta"));
days.push(new Block("Roguelike game", "(Beta 2.0)", "RoguelikeGameBeta2"));
days.push(new Block("Roguelike game", "(Beta 3.0)", "RoguelikeGameBeta3"));
days.push(new Block("Roguelike game", "(Beta 4.0)", "RoguelikeGameBeta4"));
days.push(new Block("Roguelike game", "(Beta 5.0)", "RoguelikeGameBeta5"));
days.push(new Block("Roguelike game", "(Beta 6.0)", "RoguelikeGameBeta6"));
days.push(new Block("Division into", "syllable", "DivisionIntoSyllables"));
days.push(new Block("Generation of", "clever phrases", "GenerationOfCleverPhrases"));
days.push(new Block("Solve my", "barley-break", "SolveMyBarley-break"));
days.push(new Block("Roguelike", "game", "RoguelikeGame"));
days.push(new Block("The modulation","of flying ball","TheModulationOfFlyingBall"));
days.push(new Block("Modulation of the","biological process","ModulationOfTheBiologicalProcess"));
days.push(new Block("Musical","tiles","MusicalTiles"));
days.push(new Block("Find the","number PI","FindTheNumberPI"));
//end of the Day list


for(var i = 0; i < days.length; i++)
{
	if(days.length - 1 != i)
	{
		document.write("<div class = 'Day" + (i + 1) + "'>" +
						  "<h1>Day " + (i + 1) + "</h1>" +
						  "<h2>" + days[i].firstString + "<br>" + days[i].secondString + "</h2>" +
						  "<a class = 'button first' href = '" + days[i].viewLink + "' >View</a>" +
						  "<a class = 'button' href = '" + days[i].codeLink + "' >Code</a>" +
					   "</div>");
	}
	else
	{
		document.write("<div class = 'Day" + (i + 1) + "'>" +
							  "<div class = 'newDay'>" +
								  "<img src = 'Images/NewDay.png'>" +
							  "</div>" + 
							  "<h1>Day " + (i + 1) + "</h1>" +
							  "<h2>" + days[i].firstString + "<br>" + days[i].secondString + "</h2>" +
							  "<a class = 'button first' href = '" + days[i].viewLink + "' >View</a>" +
							  "<a class = 'button' href = '" + days[i].codeLink + "' >Code</a>" +
						  "</div>");
	}
	
	
	document.styleSheets[0].insertRule(".center .Day" + (i + 1) + " { background: #" + days[i].color + " }", 0);
}
