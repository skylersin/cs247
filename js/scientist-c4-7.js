/*
*
* Global Variables / Initialization
*
*/

var Arm_Index = 0;

let link = "Chapter1-Start.html";
let images = ["images/FistBump-Down.png", "images/FistBump-Up.png"];

document.getElementById("speechbubble").style.visibility = "hidden";


/*
*
* Responsive Functions
*
*/

//Makes The Scientist Talk/Move
function switchImage(){
	Arm_Index = (Arm_Index+1)%2;
    imglink = images[Arm_Index];
    document.getElementById("scientist-png").src = imglink;
}

//Shows Click To Continue Indicator
function showClickToContinue(){
	document.getElementById("clicktocontinue").style.visibility = "visible";
}


//Redirects Page When Explanation Is Done
function redirectPage () {
	window.location = link;
}



/*
*
* ACTION LISTENERS / INTERVALS
*
*/

setInterval(function(){ switchImage(); }, 200);

document.getElementById("scene-box").addEventListener("click", function(){
	redirectPage();
});