
var OPENCLOSE = 0;
var ARM = 0;
var SWITCHARMPROB = .15;



let images = [["images/Scientist-Closed.png", "images/Scientist-Open.png"],["images/Scientist-Closed-Arm.png", "images/Scientist-Open-Arm.png"]]

setInterval(function(){ switchImage(); }, 500);



function switchImage(){
    OPENCLOSE = (OPENCLOSE+1)%2;
    if (Math.random()<SWITCHARMPROB) {
        ARM = (ARM+1)%2;
    }
    imglink = images[ARM][OPENCLOSE];
    document.getElementById("scientist-png").src = imglink;
}

document.getElementById("scientist-png").src = "images/Scientist-Closed-Arm.png";