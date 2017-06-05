
// Globals
var BASE = 5;
// this in base 10
var GOAL_AMOUNT = 16; // the amount the user is supposed to represent
var GRAY_COLOR = "#979797"
var HIGHLIGHT_COLOR = "#97FF93"
var BLACK_COLOR = "#000000"
var RED_COLOR = "#B2434C"
var GREEN_COLOR = "#55B26B"

var LEFT_KEYCODE = 37;
var UP_KEYCODE = 38;
var RIGHT_KEYCODE = 39;
var DOWN_KEYCODE = 40;

var DONE = false;

// This holds how much liquid is in each beaker
// Indexed from 0: right most beaker --> end
var vialAmounts = [0, 0, 0];

var curr_amount = 0; // keeps track of amount represented in beaker

// Index of focused beaker
var focusedBeaker = 0;



document.getElementById("chapter1").addEventListener("mouseover", function(){
    document.getElementById("chapter1-svg").data = "images/Chapter-1-Highlight.svg";
    document.getElementById("description").textContent = "In this chapter you awaken in a lab to find the world is in trouble. Learn what you can do.";
    document.getElementById("description").style.visibility = "visible";
});
document.getElementById("chapter1").addEventListener("mouseout", function(){
    document.getElementById("chapter1-svg").data = "images/Chapter-1.svg";
    document.getElementById("description").style.visibility = "hidden";
});



document.getElementById("chapter2").addEventListener("mouseover", function(){
    document.getElementById("chapter2-svg").data = "images/Chapter-2-Highlight.svg";
    document.getElementById("description").textContent = "Get your lab coat because you're about to be learning about bases.";
    document.getElementById("description").style.visibility = "visible";
});
document.getElementById("chapter2").addEventListener("mouseout", function(){
    document.getElementById("chapter2-svg").data = "images/Chapter-2.svg";
    document.getElementById("description").style.visibility = "hidden";
});


document.getElementById("chapter3").addEventListener("mouseover", function(){
    document.getElementById("chapter3-svg").data = "images/Chapter-3-Highlight.svg";
    document.getElementById("description").textContent = "Now is the time to start learning how to convert bases by crunching the numbers.";
    document.getElementById("description").style.visibility = "visible";
});
document.getElementById("chapter3").addEventListener("mouseout", function(){
    document.getElementById("chapter3-svg").data = "images/Chapter-3.svg";
    document.getElementById("description").style.visibility = "hidden";
});

document.getElementById("chapter4").addEventListener("mouseover", function(){
    document.getElementById("chapter4-svg").data = "images/Chapter-4-Highlight.svg";
    document.getElementById("description").textContent = "It's time to save the world with what you know.";
    document.getElementById("description").style.visibility = "visible";
});
document.getElementById("chapter4").addEventListener("mouseout", function(){
    document.getElementById("chapter4-svg").data = "images/Chapter-4.svg";
    document.getElementById("description").style.visibility = "hidden";
});



function action_arrow_key(keyCodeNumber) {
    set_message("");
    if(!DONE){
        switch (keyCodeNumber) {
        case UP_KEYCODE:
            console.log('UP');
            // want to move the amount of liquid up
            incr_focused_vial();
            break;
        case DOWN_KEYCODE:
            console.log('DOWN');
            // want to move the amount of liquid down
            decr_focused_vial();
            break;
        case RIGHT_KEYCODE:
            console.log('Right');
            // want to eventually shift focus here to a different beaker
            if(focusedBeaker > 0){
                focusedBeaker--;
            }
            updateBeakerFocus();
            break;
        case LEFT_KEYCODE:
            console.log('Left');
            // want to eventually shift focus here to a different beaker
            if(focusedBeaker < 2){
                focusedBeaker++;
            }
            updateBeakerFocus();
            break;
        default:
            break;
        }
    }
}

function checkKeycode(event) {
    // handling Internet Explorer stupidity with window.event
    // @see http://stackoverflow.com/a/3985882/517705
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;

    action_arrow_key(keycode);
    return false;
}

document.onkeydown = checkKeycode;
        
function updateBeakerFocus(){
    if(focusedBeaker == 0){
        // show small
        focus(0);
        // hide medium
        unfocus(1);
    }else if(focusedBeaker == 1){
         // hide large
         unfocus(2);
         // hide small
         unfocus(0);
         // show medium
         focus(1);
    }else {
        // show large
        focus(2);
        // hide medium
        unfocus(1);
    }
}

function amount_base_10(num, place){
    return num * Math.pow(BASE, place);
}

function update_curr_amount(){
    var ones_val = vialAmounts[0]; // ones place
    var second_val = vialAmounts[1] * Math.pow(BASE, 1);
    var third_val = vialAmounts[2] * Math.pow(BASE, 2);
    curr_amount = ones_val + second_val + third_val;
    console.log(curr_amount);
}

function places_to_base_10(place_0, place_1, place_2){

}


function set_message(text, color_green=false){
   if(!DONE){
       if(color_green){
         document.getElementById("message").style.color = GREEN_COLOR; 
       }else{
         document.getElementById("message").style.color = RED_COLOR; 
       }
       document.getElementById("message").textContent = text; 
   }
}

function incr_focused_vial(){
  // do check
  if(vialAmounts[focusedBeaker] < BASE -1){
    vialAmounts[focusedBeaker] += 1;
    update_curr_amount();
    updateVials();    
    updateMath();
  } else{
    set_message("Try adding to a different beaker. This one does not have anymore space.");
  }

}

function decr_focused_vial(){
  if(vialAmounts[focusedBeaker] > 0){
    vialAmounts[focusedBeaker] -= 1;
    update_curr_amount();
    updateVials();
    updateMath();
  } else{
    set_message("Ah, you cannot take any more liquid out of this beaker--it's empty!");
  }

}


// Questions: 
// - could just add same sized beaker
// - or could add next size up??
// - and could have these hardcoded??
// - map from index --> ID and the height of it.
function updateVials(){
   var thisVialAmount = vialAmounts[0];
  var svgDoc = document.getElementById("small-vial-obj").contentDocument 
  if(thisVialAmount != 0){
     svgDoc.getElementById("Vial-Fill").setAttribute("y", 110-thisVialAmount*20);
  } else{
     svgDoc.getElementById("Vial-Fill").setAttribute("y", 140-thisVialAmount*20);
  }

  thisVialAmount = vialAmounts[1];
  svgDoc = document.getElementById("med-vial-obj").contentDocument 
  if(thisVialAmount != 0){
     svgDoc.getElementById("Vial-Fill").setAttribute("y", 110-thisVialAmount*20);
  } else{
     svgDoc.getElementById("Vial-Fill").setAttribute("y", 140-thisVialAmount*20);
  }
 
  thisVialAmount = vialAmounts[2];
  svgDoc = document.getElementById("large-vial-obj").contentDocument 
  if(thisVialAmount != 0){
     svgDoc.getElementById("Vial-Fill").setAttribute("y", 110-thisVialAmount*20);
  } else{
     svgDoc.getElementById("Vial-Fill").setAttribute("y", 140-thisVialAmount*20);
  }
 

}

function get_math_html(vial_index){
    return vialAmounts[vial_index] + " x " + Math.pow(BASE, vial_index) + " = " + "<b>" + (Math.pow(BASE, vial_index) * vialAmounts[vial_index]) + "</b>"
}

function updateMath(){
  console.log("UPDATE MATH");
  var largeMathElem = document.getElementById("math-largest-sub-normal");
  largeMathElem.textContent = "-" + amount_base_10(vialAmounts[2], 2);
  var largeMathBelow = document.getElementById("large-math");
  //largeMathBelow.textContent = get_math_str(2);
  largeMathBelow.innerHTML = get_math_html(2);


  var medMathElem = document.getElementById("math-med-sub");
  medMathElem.textContent = "-" + amount_base_10(vialAmounts[1], 1);
  console.log("changed it to: " + "-" + amount_base_10(vialAmounts[1], 1));
  var medMathBelow = document.getElementById("med-math");
  //medMathBelow.textContent = get_math_str(1);
  medMathBelow.innerHTML = get_math_html(1);

  var smallMathElem = document.getElementById("math-small-sub");
  smallMathElem.textContent = "-" + amount_base_10(vialAmounts[0], 0);
  var smallMathBelow = document.getElementById("small-math");
  //smallMathBelow.textContent = get_math_str(0);
  smallMathBelow.innerHTML = get_math_html(0);


  var resultMathElem = document.getElementById("math-result");
  //resultMathElem.textContent = GOAL_AMOUNT - curr_amount; 
  resultMathElem.textContent = GOAL_AMOUNT - curr_amount; 
  if (GOAL_AMOUNT == curr_amount){
    // THE USER DID IT!!!!!!!!!
    resultMathElem.style.color = GREEN_COLOR;
    largeMathBelow.style.color = GREEN_COLOR;
    medMathBelow.style.color = GREEN_COLOR;
    smallMathBelow.style.color = GREEN_COLOR;
    makeDone();
    DONE = true;
  } else {
    resultMathElem.style.color = RED_COLOR;
    largeMathBelow.style.color = BLACK_COLOR;
    medMathBelow.style.color = BLACK_COLOR;
    smallMathBelow.style.color = BLACK_COLOR;
    if(DONE){
        DONE = false;
        set_message("");
    }
  }

}


function makeDone(){
    document.getElementById("button-row").style.display = "none";
    document.getElementById("question-row-second").style.display = "inline";
    document.getElementById("end-text").style.visibility="visible";
    document.getElementById("continue-button").style.visibility="visible";
}

function nextPage(){
    //TODO-- redirect here
    console.log("go to next page");
}

function unfocus(index){
    if(index == 2){
        var svgDoc = document.getElementById("large-vial-obj").contentDocument 
    } else if(index == 1){
        var svgDoc = document.getElementById("med-vial-obj").contentDocument 
    } else{
        var svgDoc = document.getElementById("small-vial-obj").contentDocument 
    }
    svgDoc.getElementById("Highlight").setAttribute("visibility", "hidden");
    svgDoc.getElementById("Vial-Outline").setAttribute("stroke", GRAY_COLOR);
    svgDoc.getElementById("Measurment-Small").setAttribute("fill", GRAY_COLOR);
}

function focus(index){
    if(index == 2){
        var svgDoc = document.getElementById("large-vial-obj").contentDocument 
    } else if(index == 1){
        var svgDoc = document.getElementById("med-vial-obj").contentDocument 
    } else{
        var svgDoc = document.getElementById("small-vial-obj").contentDocument 
    }
    svgDoc.getElementById("Highlight").setAttribute("visibility", "visible");
    svgDoc.getElementById("Vial-Outline").setAttribute("stroke", BLACK_COLOR);
    svgDoc.getElementById("Measurment-Small").setAttribute("fill", BLACK_COLOR);
}

