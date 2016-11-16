
function Rabbit(sex, parant, x, y) {
	this.id = numberCreatures;
	this.name = "Rabbit " + (sex ? "Man" : "Woman");
	this.sex = sex;
	this.parents = parant;
	this.age = 120;
	this.hungry = 0;
	this.notHungry = 3;
	this.inLove = 1;
	this.image = sex ? rabbitM : rabbitW;
	this.food = [];
	this.freeCells = [];
	this.fans = [];
	this.x = x;
	this.y = y;

	numberRabbits++;
	numberCreatures++;
}
