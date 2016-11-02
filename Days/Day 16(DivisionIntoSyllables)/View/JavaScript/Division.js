
function divisionIntoSyllables()
{
	var word = document.getElementById("in").value.toLowerCase();
	var out = "";
	var mas = new Array();
	
	for(var i = 0; i < word.length; i++)
	{
		mas[i] = word.charAt(i);
	}	

	if(incorrectLetters(mas))
	{
		document.getElementById("out").innerHTML = "Вы некоретно ввели слово!";
	}
	else
	{	
		if(VowelsIsEqualToOne(mas))
		{
			for(var i = 0; i < mas.length; i++)
			{
				out += mas[i] + "";
			}
			document.getElementById("out").innerHTML = out;
		}
		else
		{
			for(var i = 0; i < mas.length; i++)
			{							
				if(itIsVowel(mas[i]))
				{
					if(i + 4 <= mas.length && !itIsVowel(mas[i + 1]) && !itIsVowel(mas[i + 2]))
					{
						if(mas[i + 1] == 'т' && mas[i + 2] == 'ь' && mas[i + 3] == 'с')
						{
							out += mas[i] + "-";
						}
						else if(mas[i + 2] == 'ь' || mas[i + 2] == 'ъ')
						{
							out += mas[i] + "" + mas[i + 1] + "" + mas[i + 2] + "-";
							i += 2;
						}
						else if(mas[i + 1] == mas[i + 2])
						{
							out += mas[i] + "-";
						}
						else if(itIsException(mas[i + 1]))
						{
							out += mas[i] + "" + mas[i + 1] + "-";
							i++;
						}
						else
						{
							out += mas[i] + "-";
						}
					}
					else
					{
						if(!itIsLastVowel(i, mas))
						{
							out += mas[i] + "-";
						}	
						else
							out += mas[i];
					}
				}
				else
				{
					out += mas[i];
				}
			}
			document.getElementById("out").innerHTML = out;
		}
	}
		
	function incorrectLetters(massive)
	{
		var inLetter = ['1', '2', '3',  '4',  '5', '6', '7', '8',  '9', '0', '!', '@', '#', '$', '%',
						   '&', '*', '(',  ')',  '-', '_', '=', '+', '\\', '|', '~', '`', '{', '}', '[',
						   ']', ';', ':', '\'', '\"', '<', ',', '>',  '.', '/', '?', 'a', 'b', 'c', 'd',
						   'e', 'f', 'g',  'h',  'i', 'j', 'k', 'l',  'm', 'n', 'o', 'p', 'q', 'r', 's', 
						   't', 'u', 'v', 'w',  'x',  'y', 'z', ' '];
		for(var i = 0; i < massive.length; i++)
		{
			for(var j = 0; j < inLetter.length; j++)
			{
				if(massive[i] == inLetter[j])
				{
					return true;
				}
			}
		}
		return false;
	}
		
	function VowelsIsEqualToOne(massive)
	{
		var check = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
		var a = 0;
		
		for(var k = 0; k < massive.length; k++)
		{
			for(var l = 0; l < check.length; l++)
			{
				if(massive[k] == check[l])
					a++;
			}
		}
		
		if(a == 1)
			return true;
		
		return false;
	}
		
	function itIsVowel(letter)
	{
		var vowelsRUS = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
		
		for(var n = 0; n < vowelsRUS.length; n++)
		{
			if(letter == vowelsRUS[n])
				return true;
		}
		
		return false;
	}
		
	function itIsException(letter)
	{
		var exception = ['й', 'р', 'л', 'м', 'н'];
		
		for(var e = 0; e < exception.length; e++)
		{
			if(letter == exception[e])
				return true;
		}
		
		return false;
	}
		
	function itIsLastVowel(Numberletter, word)
	{
		for(var j = Numberletter + 1; j < word.length; j++)
		{
			if(itIsVowel(word[j]))
				return false;
		}
		
		return true;
	}
}
