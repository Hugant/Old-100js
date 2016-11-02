var keys = {
	"LEFT": 37,
	"RIGHT": 39,
	"UP": 38,
	"DOWN": 40
};

var keyDown = 0;

var setKey = function(keyCode) {
	keyDown = keyCode;
};

var clearKey = function(keyCode) {
	keyDown = 0;
};

var isKeyDown = function(keyName) {
	return keyDown == keys[keyName];
};

function createVirtualKeyboard()
{
	window.onkeydown = function(e) {
		setKey(e.keyCode);
	};
	
	window.onkeyup = function(e) {
		clearKey(e.keyCode);
	};
}