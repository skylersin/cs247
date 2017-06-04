
var Mouth_Index = 0;
var Arm_Index = 0;
var Text_Index = 0;
var SWITCHARMPROB = .15;
var TIME = 0;



let images = [["images/Scientist-Closed.png", "images/Scientist-Open.png"],["images/Scientist-Closed-Arm.png", "images/Scientist-Open-Arm.png"]]
let text = ["Oh. You're Awake. Thank Goodness!",
	"Hi. I am Scientist Bob. There's been an emergency",
	"The world has been hit with a deadly virus. We need your help to stop it",
	"You see we aren't so good at our bases and have been struggling to make a vaccine",
	"Oh? You don't know your bases?",
	"That's fine. I'm sure you will learn fast.",
	"Let me introduce you to the lab"];

setInterval(function(){ switchImage(); }, 500);



function switchImage(){
	if(TIME <= 0){
		return;
	}
	TIME = TIME-1;
    Mouth_Index = (Mouth_Index+1)%2;
    if (Math.random()<SWITCHARMPROB) {
        Arm_Index = (Arm_Index+1)%2;
    }
    imglink = images[Arm_Index][Mouth_Index];
    document.getElementById("scientist-png").src = imglink;
}




document.getElementById("scene-box").addEventListener("click", function(){
	if(Text_Index == 0){
		setupSpeechBubble();
	}
    switchText();
});


function switchText(){
	if(Text_Index >= text.length){
		redirectPage();
	}
	if(TIME % 2 == 1) TIME -= 1;
	TIME = 14;
    document.getElementById("speechtext").textContent = text[Text_Index];
    Text_Index += 1;
}

function redirectPage () {
	window.location = "Chapter1-Start.html";
}

function setupSpeechBubble(){
	document.getElementById("speechbubble").style.visibility = "visible";

}

document.getElementById("speechbubble").style.visibility = "hidden";