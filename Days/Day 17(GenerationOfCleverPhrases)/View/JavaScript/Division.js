
function generatePhrase()
{
	var phrases = [];
	phrases.push("Lost time is never found again.")
	phrases.push("People do not notice, such as crying that goes through life laughing.");
	phrases.push("It’s better to bum out than to fade away");
	phrases.push("The future belongs to those, who believe of their dreams.");
	phrases.push("The wisest man I have ever known once said to me: «Nine out of every ten people improve on acquaintance,» and I have found his words true. Frank Swinnerton");
	phrases.push("No matter how big and tough a problem may be, get rid of confusion by taking one little step toward solution. Do something. George F. Nordenholt");
	phrases.push("Be content with your lot; one cannot be first in everything.");
	phrases.push("How much more grievous are the consequences of anger than the causes of it.");
	phrases.push("Though modesty be a virtue, yet bashfulness is a vice. Thomas Fuller");
	phrases.push("A poor beauty finds more lovers than husbands. George Herbert");
	phrases.push("We believe nothing so firmly as what we least know. Michel de Montaigne");
	phrases.push("Nobody can go back and start a new beginning, but anyone can start today and make a new ending.");
	phrases.push("Admonish your friends in private; praise them in public. Publilius Syrus");
	phrases.push("To get out of difficulty,one usually must go through it.");
	phrases.push("Anger is a condition in which the tongue works faster than the mind.");
	phrases.push("Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young.");
	phrases.push("Each of us aims to find a man which will understand and will not cause suffering…");
	phrases.push("Love as expensive crystal, you with it be cautious!");
	phrases.push("Loneliness is when you hear as the clock ticks …");
	phrases.push("I want that you came out from my heart as quickly as you get out of on-line ..");
	phrases.push("Love is an irresistible desire to be irresistibly desired.");
	phrases.push("I love to see, when you smile. It’s makes me happy, don’t ask me why…");
	phrases.push("The way to love anything, is to realize it can be lost.");
	phrases.push("I never forget a face, but in your case I would be glad to make an exception.");
	phrases.push("Always forgive your enemies; nothing annoys them so much.");
	phrases.push("Good girls go to heaven, and bad-where want.");
	phrases.push("Only my dream keeps me alive.");
	phrases.push("Be careful with your thoughts – they are the beginning of deeds");
	phrases.push("Everyone has one's own path");
	phrases.push("Now or never");
	phrases.push("He, who does not love loneliness, does not love freedom");
	phrases.push("A dream becomes a goal when action is taken toward its achievement");
	phrases.push("Illusion is the first of all pleasures");
	phrases.push("No act of kindness, no matter how small, is ever wasted");
	phrases.push("Enjoy every moment");
	phrases.push("The only thing in life achieved without effort is failure");
	phrases.push("Those who cannot change their minds cannot change anything");
	
	document.getElementById("phrases").innerHTML = "\"" + phrases[Math.floor(Math.random() * (phrases.length))] + "\"";
}