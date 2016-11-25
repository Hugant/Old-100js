var inputOk = 0;
var RedF;
var GreenF;
var BlueF;
var RedS;
var GreenS;
var BlueS;
var FirstColor;
var SecondColor;

function CheckInput(nInput) {
    if (nInput == 1)
        var input = document.getElementById("input1");
    else
        var input = document.getElementById("input2");

    var color = input.value.toUpperCase();
    if (color.length == 7) {
        if (color.charAt(0) == "#") {
            inputOk = 1;
            input.style.borderColor = "lightgreen";
        } else {
            inputOk = 0;
            input.style.borderColor = "red";
        }
    } else {
        inputOk = 0;
        input.style.borderColor = "red";
    }
}

function convert(number) {
    if (number.length < 2)
        return "0" + number;
    else
        return number;
}

function TravelByColor() {
    if (inputOk) {
        FirstColor = document.getElementById("input1").value.toUpperCase();
        SecondColor = document.getElementById("input2").value.toUpperCase();

        FirstColor = FirstColor.substr(1, 6);
        SecondColor = SecondColor.substr(1, 6);

        RedF = FirstColor.substr(0, 2);
        GreenF = FirstColor.substr(2, 2);
        BlueF = FirstColor.substr(4, 2);

        RedS = SecondColor.substr(0, 2);
        GreenS = SecondColor.substr(2, 2);
        BlueS = SecondColor.substr(4, 2);

        FirstColor = parseInt(FirstColor, 16);
        SecondColor = parseInt(SecondColor, 16);

        RedF = parseInt(RedF, 16);
        GreenF = parseInt(GreenF, 16);
        BlueF = parseInt(BlueF, 16);

        RedS = parseInt(RedS, 16);
        GreenS = parseInt(GreenS, 16);
        BlueS = parseInt(BlueS, 16);

        GoToColor(RedF, GreenF, BlueF, RedS, GreenS, BlueS, FirstColor, SecondColor);
    }
}

function GoToColor(redF, greenF, blueF, redS, greenS, blueS, firstValue, secondValue) {
    if (firstValue == secondValue) {
        firstValue = firstValue.toString(16);
        document.getElementById("body").style.background = "#" + firstValue;
    } else {
        var intervalID3 = setInterval(function() {
            if (redF < redS)
                redF++;
            else if (redF > redS)
                redF--;
            else
                clearInterval(intervalID3);

            redF = convert(redF).toString(16);
            greenF = convert(greenF).toString(16);
            blueF = convert(blueF).toString(16);

            document.getElementById("body").style.background = "#" + redF + greenF + blueF;

            redF = parseInt(redF, 16);
            greenF = parseInt(greenF, 16);
            blueF = parseInt(blueF, 16);
        }, 200);

        var intervalID2 = setInterval(function() {
            if (greenF < greenS)
                greenF++;
            else if (greenF > greenS)
                greenF--;
            else
                clearInterval(intervalID2);

            redF = convert(redF).toString(16);
            greenF = convert(greenF).toString(16);
            blueF = convert(blueF).toString(16);

            document.getElementById("body").style.background = "#" + redF + greenF + blueF;

            redF = parseInt(redF, 16);
            greenF = parseInt(greenF, 16);
            blueF = parseInt(blueF, 16);
        }, 200);

        var intervalID1 = setInterval(function() {
            if (blueF < blueS)
                blueF++;
            else if (blueF > blueS)
                blueF--;
            else
                clearInterval(intervalID1);

            redF = redF.toString(16);
            greenF = greenF.toString(16);
            blueF = convert(blueF).toString(16);

            document.getElementById("body").style.background = "#" + redF + greenF + blueF;

            redF = parseInt(redF, 16);
            greenF = parseInt(greenF, 16);
            blueF = parseInt(blueF, 16);
        }, 200);
    }
}
