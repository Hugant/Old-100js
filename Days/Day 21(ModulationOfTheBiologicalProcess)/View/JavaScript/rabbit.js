
function Rabbit(sex, parants, x, y) {
	this.id = numberCreatures;
	this.name = "Rabbit " + (sex ? "Man" : "Woman");
	this.sex = sex;
	this.parents = parants;
	this.age = 0;
	this.hungry = 1;
	this.inLove = 0;
	this.image = sex ? rabbitM : rabbitW;
	this.food = [];
	this.freeCells = [];
	this.fans = [];
	this.x = x;
	this.y = y;

	numberRabbits++;
	numberCreatures++;
}
