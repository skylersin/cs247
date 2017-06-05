var num1 = 6;
var num1base3 = 20;
var num2 = 10;
var num2base7 = 13;

function addNum1() {
	num1 += 1;
	num1base3 = convertBase(num1, 3);
	var image = document.getElementById("num1");
	image.innerHTML ="0"+num1base3+"<sub>3</sub>";
}

function addNum2() {
	num2 += 1;
	num2base7 = convertBase(num2, 7);
	var image = document.getElementById("num2");
	console.log(image);
	image.innerHTML ="0"+num2base7+"<sub>7</sub>";
}

function subtractNum1() {
	if (num1 > 0) {
		num1 -= 1;
		num1base3 = convertBase(num1, 3);
		var image = document.getElementById("num1");
		image.innerHTML ="0"+num1base3+"<sub>3</sub>";
	}
}

function subtractNum2() {
	if (num2 > 0) {
		num2 -= 1;
		num2base7 = convertBase(num2, 7);
		var image = document.getElementById("num2");
		console.log(image);
		image.innerHTML = "=" + num2base7+"<sub>7</sub>";
	}
}

function convertBase(num, base) {
	var result = "";
	while (num != 0) {
		remainder = parseInt(num % base);
		num = parseInt(num / base);
		result = result.concat(remainder);
	}
	if (result == "") {
		return "0"
	}
	return reverseString(result);
}

function checkAnswer() {
	if (num1 == num2) {
		var html = document.getElementById("answer");
		html.innerHTML = "Correct! These are both " + num1+"<sub>10</sub>"; 
		document.getElementById("continue").style.visibility="visible";
        //var html = document.getElementById("continue");
		//html.className = "btn btn-secondary btn-lg btn-outline-success ";
		document.getElementById("checkanswer").style.display = "none";
	} else {
		var html = document.getElementById("answer");
		html.innerHTML = "Wrong Answer! Try Again!";
	}
}


function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join(""); 
    return joinArray; 
}