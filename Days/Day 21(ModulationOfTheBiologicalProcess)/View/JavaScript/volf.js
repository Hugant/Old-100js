
function Volf(sex, parants, x, y) {
	this.id = numberCreatures;
	this.name = "Volf " + (sex ? "Man" : "Woman");
	this.sex = sex;
	this.parents = parants;
	this.age = 0;
	this.hungry = 1;
	this.inLove = 0;
	this.image = sex ? volfM : volfW;
	this.food = [];
	this.freeCells = [];
	this.x = x;
	this.y = y;

	numberVolfs++;
	numberCreatures++;
}
