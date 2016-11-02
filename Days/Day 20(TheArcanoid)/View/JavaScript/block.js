var defaultWidth = 70;
var defaultHeight = 30;
var defaultColor = "black";
var defaultName = "block";

function Block() {
	if(arguments.length == 1) {
		this.width = defaultWidth;
		this.height = defaultHeight;
		this.color = arguments[0];
		this.name = "block";
	} else if(arguments.length == 3) {
		this.width = arguments[0];
		this.height = arguments[1];
		this.color = arguments[2];
		this.name = "block";
	} else {
		this.width = defaultWidth;
		this.height = defaultHeight;
		this.color = defaultColor;
		this.name = "empty";
	}
	
	this.coordX = 0;
	this.coordY = 0;
}