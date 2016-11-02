var out  = {
	vision: function()
	{
		if(arguments.length % 2 == 0)
		{
			for(var i = 0; i < arguments.length; i += 2)
			{
				if(arguments[i + 1].toUpperCase() == "OFF")
				{
					if(document.getElementById(arguments[i]) != null)
					{
						document.getElementById(arguments[i]).style.display = "none";
					}
					else
					{
						console.log("ERROR: " + (i + 1) + " argument array is not id - vision()");
					}
				}
				else if(arguments[i + 1].toUpperCase() == "ON")
				{
					if(document.getElementById(arguments[i]) != null)
					{
						document.getElementById(arguments[i]).style.display = "block";
					}
					else
					{
						console.log("ERROR: " + (i + 1) + " argument array is not id - vision()");
					}
				}
				else
				{
					console.log("ERROR: " + (i + 2) + " argument array is incorrect - vision()");
				}
			}
		}
		else
		{
			console.log("ERROR: The array length is not divisible by two - vision()");
		}
	},

	personStats: function(person)
	{
		if(person.name == "Hugant")
		{
			document.getElementById("hillpoint").innerHTML = person.hp;
			document.getElementById("damage").innerHTML = person.damage;
			document.getElementById("vampirism").innerHTML = person.vampirism;
		}
		else
		{
			document.getElementById("enemy_name").innerHTML = person.name;
			document.getElementById("enemy_hillpoint").innerHTML = person.hp;
			document.getElementById("enemy_damage").innerHTML = person.damage;
			document.getElementById("enemy_vampirism").innerHTML = person.vampirism;
		}
	},

	unknownEnemy: function()
	{
		document.getElementById("enemy_name").innerHTML = "??????";
		document.getElementById("enemy_hillpoint").innerHTML = "??";
		document.getElementById("enemy_damage").innerHTML = "??";
		document.getElementById("enemy_vampirism").innerHTML = "??";
	},

	deceasedPerson: function()
	{
		document.getElementById("enemy_hillpoint").innerHTML = "-";
		document.getElementById("enemy_damage").innerHTML = "-";
		document.getElementById("enemy_vampirism").innerHTML = "-";
	}
};
