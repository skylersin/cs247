var num = "0000";
var target = 7;
function toggle(bulb, bulbNum) {
	var replacement = "0";
	if (num.charAt(bulbNum) == "0") {
		replacement = "1"
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
	if (num == "0111") {
		document.getElementById("sendIt").innerHTML = "<h3>Correct! You saved the president!</h3>";
		document.getElementById("nextPage").className = "btn btn-secondary btn-lg btn-outline-success text-center";
	} else {
		document.getElementById("sendIt").innerHTML = "<h3>Rats! You killed the president</h3>";
		document.getElementById("tryagain").className = "btn btn-secondary btn-lg btn-outline-danger text-center";
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


function reset() {
	num = "0000"
	document.getElementById("shownNum").innerHTML = num+"<sub>2</sub>";
	document.getElementById("bulb1").setAttribute("data", "images/LightBulbOff.svg");
	document.getElementById("bulb2").setAttribute("data", "images/LightBulbOff.svg");
	document.getElementById("bulb3").setAttribute("data", "images/LightBulbOff.svg");
	document.getElementById("bulb4").setAttribute("data", "images/LightBulbOff.svg");
	document.getElementById("sendIt").innerHTML = "<button type=\"button\"  onclick=\"sendIt()\" class=\"btn btn-secondary btn-lg btn-outline-warning\">Send It</button>";
	document.getElementById("tryagain").className = "hidden";
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}