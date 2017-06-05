/*
*
* Global Variables / Initialization
*
*/

var Tutorial_Index = 0;
var Time_Index = 10;
let Tutorial_Length = 15;

let FilePath = "images/tutorial/t";
let link = "Chapter1-3.html"

document.getElementById("clicktocontinue").style.visibility = "hidden";


/*
*
* Responsive Functions
*
*/

//Shows click to continue if the user hasn't done anything in a while
function timeStep(){
	if(Time_Index == 0){
		showClickToContinue();
		return;
	}
	Time_Index -= 1;
}

//Switches the Tutorial screen
function nextPage(){
	Tutorial_Index += 1;
	if(Tutorial_Index >= Tutorial_Length){
		redirectPage();
	}
	Time_Index = 10;
	document.getElementById("clicktocontinue").style.visibility = "hidden";
    displayPage();
    
}

//Shows Click To Continue Indicator
function showClickToContinue(){
	document.getElementById("clicktocontinue").style.visibility = "visible";
}

function displayPage(){
	var imgfile = FilePath.concat(Tutorial_Index.toString());
	imgfile = imgfile.concat(".png");
	document.getElementById("tutorial-png").src = imgfile;
}

//Redirects Page When Explanation Is Done
function redirectPage () {
	window.location = link;
}




setInterval(function(){ timeStep(); }, 250);

document.getElementById("scene-box").addEventListener("click", function(){
    nextPage();
});
