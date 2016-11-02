var number = 0;

window.onload = function() {
	document.getElementById("number").innerHTML = formatNumber(number);

	window.onmousedown = function() {
		number++;
		document.getElementById("number").innerHTML = formatNumber(number);
	};
};

function formatNumber(num) {
	num = num.toString(10);
	
	for(var i = num.length; i < 11; i++) {
		num = "0" + num;
	}
	
	var output = num[0] + " " + "(" + num[1] + num[2] + num[3] + ") "  +
			+ num[4] + num[5] + num[6] + "-" +
			+ num[7] + num[8] + "-" + num[9] + num[10];
			
	return output;
}