var num = "0000";
var target = 7;

var bulb_img_ids = ["switch1", "switch2", "switch3", "switch4"]

function toggle(bulb, bulbNum, bulbIndex) {
	var replacement = "0";
    var elem_id = "img" + bulbNum;
	if (num.charAt(bulbNum) == "0") {
		replacement = "1"
	    // here, it was 0ff and we want it 0n
        document.getElementById(elem_id).src = "images/OnSwitch.svg";
    }else{
        document.getElementById(elem_id).src = "images/OffSwitch.svg";
    }
	num = num.replaceAt(bulbNum, replacement);
	console.log(num);
	document.getElementById("shownNum").innerHTML = num+"<sub>2</sub>";


	if (bulb.getAttribute("data") == "images/LightBulbOff.svg") {
		bulb.setAttribute("data", "images/LightBulbOn.svg");
	} else {
		bulb.setAttribute("data", "images/LightBulbOff.svg");
	}
}

//Can Make this more general later
function sendIt() {
	// hide the non-directions for more room
    document.getElementById("fluff-1").style.display="none";
    document.getElementById("fluff-2").style.display="none";
    // make send button disappear
    
    document.getElementById("send-button").style.display="none"; 
    
    if (num == "0111") {
	    document.getElementById("message").style.display="inline";	
	    document.getElementById("message-txt").textContent = "Correct! You saved the president!";	
        //document.getElementById("sendIt").innerHTML = "<h3>Correct! You saved the president!</h3>";
	    document.getElementById("nextPage").style.display="inline";	
		//document.getElementById("nextPage").className = "btn btn-secondary btn-lg btn-outline-success text-center";
	} else {
		//document.getElementById("sendIt").innerHTML = "<h3>Rats! You killed the president</h3>";
	    document.getElementById("message").style.display="inline";	
	    document.getElementById("message-txt").textContent = "Rats! The president is still sick.";	
        document.getElementById("tryagain").style.display="inline";
        //document.getElementById("tryagain").className = "btn btn-secondary btn-lg btn-outline-danger text-center";
	}
}

// function sendIt1() {
// 	if (num == "0111") {
// 		document.getElementById("sendIt").innerHTML = "<h3>Correct! You saved the president!</h3>";
// 		document.getElementById("nextPage").className = "btn btn-secondary btn-lg btn-outline-success text-center";
// 	} else {
// 		document.getElementById("sendIt").innerHTML = "<h3>Rats! You killed the president</h3>";
// 		document.getElementById("tryagain").className = "btn btn-secondary btn-lg btn-outline-danger text-center";
// 	}
// }

function turnOffSwitches(){
    document.getElementById("img0").src = "images/OffSwitch.svg";
    document.getElementById("img1").src = "images/OffSwitch.svg";
    document.getElementById("img2").src = "images/OffSwitch.svg";
    document.getElementById("img3").src = "images/OffSwitch.svg";
}


function reset() {
	num = "0000"
	document.getElementById("shownNum").innerHTML = num+"<sub>2</sub>";
	document.getElementById("bulb1").setAttribute("data", "images/LightBulbOff.svg");
    document.getElementById("bulb2").setAttribute("data", "images/LightBulbOff.svg");
    document.getElementById("bulb3").setAttribute("data", "images/LightBulbOff.svg");
	document.getElementById("bulb4").setAttribute("data", "images/LightBulbOff.svg");
	//document.getElementById("sendIt").innerHTML = "<button type=\"button\"  onclick=\"sendIt()\" class=\"btn btn-secondary btn-lg btn-outline-warning\">Send It</button>";
	document.getElementById("message").style.display="none";	
    document.getElementById("send-button").style.display="inline"; 
	//document.getElementById("tryagain").className = "hidden";
    document.getElementById("tryagain").style.display="none";
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function nextPage(){
    // redirect to beginning here??
}
