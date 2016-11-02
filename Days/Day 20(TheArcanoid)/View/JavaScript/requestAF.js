var engine;

var requestAF = (function() {
	return requestAnimationFrame       ||
		   webkitRequestAnimationFrame ||
		   mozRequestAnimationFrame    ||
		   oRequestAnimationFrame      ||
		   msRequestAnimationFrame     ||
		   function(callback) {
			   setTimeout(callback, 1000 / 60);
		   };
})();

var setEngine = function(callback) {
	engine = callback;
};

var engineStep = function() {
	engine();
	requestAF(engineStep);
};

var engineStart = function(callback) {
	engine = callback;
	engineStep();
};