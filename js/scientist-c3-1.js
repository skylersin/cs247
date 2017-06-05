/*
*
* Global Variables / Initialization
*
*/

var Mouth_Index = 0;
var Arm_Index = 0;
var Text_Index = 0;
var Switch_Arm_Prob = .15;
var Time_Index = 0;

let link = "Chapter3-2.html";
let images = [["images/Scientist-Closed.png", "images/Scientist-Open.png"],["images/Scientist-Closed-Arm.png", "images/Scientist-Open-Arm.png"]]
let text = ["I see you brought your calculator. You sure are ready to crunch the numbers.",
	"There are couple of base conversions that we just have not made progress on. We think you'll be able to do it though.",
	"For these excercises make sure to use your arrow keys to switch vials and add or subtract from each.",
	"The first one is an easy one, but after that things will get tricky. Knock it out the park!"];

document.getElementById("speechbubble").style.visibility = "hidden";


/*
*
* Responsive Functions
*
*/

//Makes The Scientist Talk/Move
function switchImage(){
	if(Time_Index <= 0){
		showClickToContinue();
		return;
	}
	Time_Index = Time_Index-1;
    Mouth_Index = (Mouth_Index+1)%2;
    if (Math.random()<Switch_Arm_Prob) {
        Arm_Index = (Arm_Index+1)%2;
    }
    imglink = images[Arm_Index][Mouth_Index];
    document.getElementById("scientist-png").src = imglink;
}

//Switches the Text on User Click
function switchText(){
	if(Text_Index >= text.length){
		redirectPage();
	}
	if(Time_Index % 2 == 1) Time_Index = 11;
	else Time_Index = 10;
    document.getElementById("speechtext").textContent = text[Text_Index];
    Text_Index += 1;
    document.getElementById("clicktocontinue").style.visibility = "hidden";
}

//Shows Click To Continue Indicator
function showClickToContinue(){
	document.getElementById("clicktocontinue").style.visibility = "visible";
}


//Redirects Page When Explanation Is Done
function redirectPage () {
	window.location = link;
}


//Shows Speech Bubble On First Click
function setupSpeechBubble(){
	document.getElementById("speechbubble").style.visibility = "visible";

}



/*
*
* ACTION LISTENERS / INTERVALS
*
*/

setInterval(function(){ switchImage(); }, 500);

document.getElementById("scene-box").addEventListener("click", function(){
	if(Text_Index == 0){
		setupSpeechBubble();
	}
    switchText();
});

setupSpeechBubble();
switchText();