
function Volf(sex, parant, x, y) {
	this.id = numberCreatures;
	this.name = "Volf " + (sex ? "Man" : "Woman");
	this.sex = sex;
	this.parents = parant;
	this.age = 180;
	this.hungry = 0;
	this.notHungry = 3;
	this.inLove = 1;
	this.image = sex ? volfM : volfW;
	this.food = [];
	this.freeCells = [];
	this.fans = [];
	this.x = x;
	this.y = y;

	numberVolfs++;
	numberCreatures++;
}
