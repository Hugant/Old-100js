var check1 = 0;
var check2 = 0;
var check3 = 0;
var check4 = 0;

function CheckAnswer(question, numberQ) {
    if (question == 1) {
        if (check1 < 1) {
            switch (numberQ) {
                case 1:
                    document.getElementById("FirstQ1").style.background = "red";
                    break;
                case 2:
                    document.getElementById("SecondQ1").style.background = "#00e600";
                    break;
                case 3:
                    document.getElementById("ThirdQ1").style.background = "red";
                    break;
                case 4:
                    document.getElementById("FourthQ1").style.background = "red";
                    break;
            }
            check1 = 1;
        }
    }

    if (question == 2) {
        if (check2 < 1) {
            switch (numberQ) {
                case 1:
                    document.getElementById("FirstQ2").style.background = "red";
                    break;
                case 2:
                    document.getElementById("SecondQ2").style.background = "red";
                    break;
                case 3:
                    document.getElementById("ThirdQ2").style.background = "#00e600";
                    break;
                case 4:
                    document.getElementById("FourthQ2").style.background = "red";
                    break;
            }
            check2 = 1;
        }
    }

    if (question == 3) {
        if (check3 < 1) {
            switch (numberQ) {
                case 1:
                    document.getElementById("FirstQ3").style.backgroundColor = "red";
                    break;
                case 2:
                    document.getElementById("SecondQ3").style.background = "red";
                    break;
                case 3:
                    document.getElementById("ThirdQ3").style.backgroundColor = "red";
                    break;
                case 4:
                    document.getElementById("FourthQ3").style.backgroundColor = "#00e600";
                    break;
            }
            check3 = 1;
        }
    }

    if (question == 4) {
        if (check4 < 1) {
            switch (numberQ) {
                case 1:
                    document.getElementById("FirstQ4").style.backgroundColor = "red";
                    break;
                case 2:
                    document.getElementById("SecondQ4").style.background = "#00e600";
                    break;
                case 3:
                    document.getElementById("ThirdQ4").style.backgroundColor = "red";
                    break;
                case 4:
                    document.getElementById("FourthQ4").style.backgroundColor = "red";
                    break;
            }
            check4 = 1;
        }
    }
}
