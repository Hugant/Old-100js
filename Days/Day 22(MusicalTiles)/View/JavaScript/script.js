var long1 = new Audio("Music/long/tilda.wav");
var long2 = new Audio("Music/long/1.wav");
var long3 = new Audio("Music/long/q.wav");
var long4 = new Audio("Music/long/a.wav");
var long5 = new Audio("Music/long/z.wav");
var long6 = new Audio("Music/long/0.wav");
var long7 = new Audio("Music/long/p.wav");
var long8 = new Audio("Music/long/semicolon.wav");
var long9 = new Audio("Music/long/dot.wav");
var long10 = new Audio("Music/long/dash.wav");

var kit1 = new Audio("Music/kits/4.wav");
var kit2 = new Audio("Music/kits/5.wav");
var kit3 = new Audio("Music/kits/r.wav");
var kit4 = new Audio("Music/kits/t.wav");
var kit5 = new Audio("Music/kits/f.wav");
var kit6 = new Audio("Music/kits/g.wav");
var kit7 = new Audio("Music/kits/v.wav");
var kit8 = new Audio("Music/kits/b.wav");
var kit9 = new Audio("Music/kits/6.wav");
var kit10 = new Audio("Music/kits/7.wav");
var kit11 = new Audio("Music/kits/y.wav");
var kit12 = new Audio("Music/kits/u.wav");
var kit13 = new Audio("Music/kits/h.wav");
var kit14 = new Audio("Music/kits/j.wav");
var kit15 = new Audio("Music/kits/n.wav");
var kit16 = new Audio("Music/kits/m.wav");
var kit17 = new Audio("Music/kits/equal.wav");
var kit18 = new Audio("Music/kits/quotes.wav");
var kit19 = new Audio("Music/kits/lqs.wav");
var kit20 = new Audio("Music/kits/rqs.wav");
var kit21 = new Audio("Music/kits/backslash.wav");

var cont1 = new Audio("Music/constractions/2.wav");
var cont2 = new Audio("Music/constractions/3.wav");
var cont3 = new Audio("Music/constractions/w.wav");
var cont4 = new Audio("Music/constractions/e.wav");
var cont5 = new Audio("Music/constractions/s.wav");
var cont6 = new Audio("Music/constractions/d.wav");
var cont7 = new Audio("Music/constractions/x.wav");
var cont8 = new Audio("Music/constractions/c.wav");
var cont9 = new Audio("Music/constractions/9.wav");
var cont10 = new Audio("Music/constractions/8.wav");
var cont11 = new Audio("Music/constractions/i.wav");
var cont12 = new Audio("Music/constractions/o.wav");
var cont13 = new Audio("Music/constractions/k.wav");
var cont14 = new Audio("Music/constractions/l.wav");
var cont15 = new Audio("Music/constractions/comma.wav");
var cont16 = new Audio("Music/constractions/dot.wav");


var keys = {
    "48": long6,
    "49": long2,
    "50": cont1,
    "51": cont2,
    "52": kit1,
    "53": kit2,
    "54": kit9,
    "55": kit10,
    "56": cont10,
    "57": cont9,
    "65": long4,
    "66": kit8,
    "67": cont7,
    "68": cont6,
    "69": cont4,
    "70": kit5,
    "71": kit6,
    "72": kit13,
    "73": cont11,
    "74": kit14,
    "75": cont13,
    "76": cont14,
    "77": kit16,
    "78": kit15,
    "79": cont12,
    "80": long7,
    "81": long3,
    "82": kit3,
    "83": cont5,
    "84": kit4,
    "85": kit12,
    "86": kit7,
    "87": cont3,
    "88": cont8,
    "89": kit11,
    "90": long5,
    "186": long8,
    "187": kit17,
    "188": cont15,
    "189": long10,
    "190": cont16,
    "191": long9,
    "192": long1,
    "219": kit19,
    "220": kit21,
    "221": kit20,
    "222": kit18
};

window.onload = function() {
    window.onkeyup = function(e) {
        if((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 47 && e.keyCode < 58)) {
            document.getElementById(String.fromCharCode(e.keyCode).toLowerCase()).style.opacity = "1";
            keys[e.keyCode].stop();
        } else if((e.keyCode > 185 & e.keyCode < 193) || (e.keyCode > 218 && e.keyCode < 223)) {
            document.getElementById(e.key).style.opacity = "1";
            keys[e.keyCode].stop();
        }
    };

    window.onkeydown = function(e) {
        if((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 47 && e.keyCode < 58)) {
            document.getElementById(String.fromCharCode(e.keyCode).toLowerCase()).style.opacity = "0.60";
            keys[e.keyCode].play();
        } else if((e.keyCode > 185 & e.keyCode < 193) || (e.keyCode > 218 && e.keyCode < 223)) {
            document.getElementById(e.key).style.opacity = "0.60";
            keys[e.keyCode].play();
        }
    };

    window.onclick = function(e) {
        if(e.srcElement.className == "pinky"           ||
           e.srcElement.className == "ringFinger"      ||
           e.srcElement.className == "middleFinger"    ||
           e.srcElement.className == "leftIndexFinger" ||
           e.srcElement.className == "rightIndexFinger") {
               if((e.srcElement.id.toUpperCase().charCodeAt(0) > 64 && e.srcElement.id.toUpperCase().charCodeAt(0) < 91) ||
                  (e.srcElement.id.toUpperCase().charCodeAt(0) > 47 && e.srcElement.id.toUpperCase().charCodeAt(0) < 58)) {
                      keys[e.srcElement.id.toUpperCase().charCodeAt(0)].stop();
                      keys[e.srcElement.id.toUpperCase().charCodeAt(0)].play();
                  }
           }
    };

    document.getElementById("`").onclick = function() {
        keys["192"].play();
    };
    document.getElementById("-").onclick = function() {
        keys["189"].play();
    };
    document.getElementById("=").onclick = function() {
        keys["187"].play();
    };
    document.getElementById("\\").onclick = function() {
        keys["220"].play();
    };
    document.getElementById("]").onclick = function() {
        keys["221"].play();
    };
    document.getElementById("[").onclick = function() {
        keys["219"].play();
    };
    document.getElementById(";").onclick = function() {
        keys["186"].play();
    };
    document.getElementById("'").onclick = function() {
        keys["222"].play();
    };
    document.getElementById(".").onclick = function() {
        keys["190"].play();
    };
    document.getElementById(",").onclick = function() {
        keys["188"].play();
    };
    document.getElementById("/").onclick = function() {
        keys["191"].play();
    };
};

HTMLAudioElement.prototype.stop = function() {
	this.pause();
	this.currentTime = 0.0;
};
