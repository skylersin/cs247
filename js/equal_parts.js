
// Globals
var BASE_A = 3;
var BASE_B = 4;

var EQUAL = false;
// this is 331base4 in base 10
var GOAL_AMOUNT_A = 6; // the amount the user is supposed to represent
var GOAL_AMOUNT_B = 7; // the amount the user is supposed to represent
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
// Indexed from 0: right most beaker of formulaA --> right most beaker of formula B
// [small-A, med-A, large-A, small-B, med-B, large-B]
var vialAmounts = [0,0,0,0,0,0];

var curr_amount_A = 0; // keeps track of amount represented in beaker
var curr_amount_B = 0; // keeps track of amount represented in beaker

// Index of focused beaker
var focusedBeaker = 0;

function action_arrow_key(keyCodeNumber) {
    set_message("");
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
    //0       1        2        3       4       5
// [small-A, med-A, large-A, small-B, med-B, large-B]
// looks: 2 1 0 5 4 3
        if(focusedBeaker == 0){
            focusedBeaker = 5;
        }
        else if(focusedBeaker != 3){
            focusedBeaker--;
        } 
        updateBeakerFocus();
        break;
    case LEFT_KEYCODE:
        console.log('Left');
    //0       1        2        3       4       5
// [small-A, med-A, large-A, small-B, med-B, large-B]
// looks: 2 1 0 5 4 3
        if(focusedBeaker == 5){
            focusedBeaker = 0;
        }
        else if(focusedBeaker != 2){
            focusedBeaker++;
        }
        updateBeakerFocus();
        break;
    default:
        break;
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
    //0       1        2        3       4       5
// [small-A, med-A, large-A, small-B, med-B, large-B]
    if(focusedBeaker == 0){
        // hide large-B
        unfocus(5);
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
    }else if(focusedBeaker == 2){
        // show large-a
        focus(2);
        // hide medium
        unfocus(1);
    }else if(focusedBeaker == 3){
         // hide med-b
         unfocus(4);
         // show small-b
         focus(3);
    }else if(focusedBeaker == 4){
       // unfocus large-b
         unfocus(5);
        //focus med-b
        focus(4);
       // unfocus small-b
        unfocus(3);
    }else{
        // at index 5, which is large-b
        // unfocus med-b
        unfocus(4);
        // unfocus small-a
        unfocus(0);
        // focus large-b
        focus(5);
    }
}


function update_curr_amount_A(){
    var ones_val = vialAmounts[0]; // ones place
    var second_val = vialAmounts[1] * Math.pow(BASE_A, 1);
    var third_val = vialAmounts[2] * Math.pow(BASE_A, 2);
    curr_amount = ones_val + second_val + third_val;
}

function update_curr_amount_B(){
    var ones_val = vialAmounts[3]; // ones place
    var second_val = vialAmounts[4] * Math.pow(BASE_B, 1);
    var third_val = vialAmounts[5] * Math.pow(BASE_B, 2);
    curr_amount = ones_val + second_val + third_val;
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
  console.log("focusedBeaker: " + focusedBeaker);
  if(focusedBeaker < 3){
    // FORMULA A THINGS
    if(vialAmounts[focusedBeaker] < BASE_A -1){
        vialAmounts[focusedBeaker] += 1;
        update_curr_amount_A();
        updateVials();    
        updateMath();
    } else{
        set_message("Try adding Formula A to a different beaker. This one does not have anymore space.");
    }

  } else{
       if(vialAmounts[focusedBeaker] < BASE_B -1){
        vialAmounts[focusedBeaker] += 1;
        update_curr_amount_B();
        updateVials();    
        updateMath();
      } else{
        set_message("Try adding to a different beaker. This one does not have anymore space.");
      }
  }
}

function decr_focused_vial(){
  if(focusedBeaker < 3){
      if(vialAmounts[focusedBeaker] > 0){
        vialAmounts[focusedBeaker] -= 1;
        update_curr_amount_A();
        updateVials();
        updateMath();
      } else{
        set_message("Ah, you cannot take any more liquid out of this beaker--it's empty!");
      }
  }else{
      if(vialAmounts[focusedBeaker] > 0){
        vialAmounts[focusedBeaker] -= 1;
        update_curr_amount_B();
        updateVials();
        updateMath();
      } else{
        set_message("Ah, you cannot take any more liquid out of this beaker--it's empty!");
      }
  }
}


function guessedYes(){
    // hide the yes/no/Are these equal
     document.getElementById("button-yes").style.display = "none";
     document.getElementById("button-no").style.display = "none";
     document.getElementById("question-text").style.display = "none";

     // Show equal-wrong text
     document.getElementById("equal-correct").style.display = "inline";
     // show try-again button
     document.getElementById("continue").style.display = "inline";
}

function guessedNo(){
// hide the yes/no/Are these equal
     document.getElementById("button-yes").style.display = "none";
     document.getElementById("button-no").style.display = "none";
     document.getElementById("question-text").style.display = "none";

     // Show equal-wrong text
     document.getElementById("equal-wrong").style.display = "inline";
     // show try-again button
     document.getElementById("try-again").style.display = "inline";
}

function reset(){
   vialAmounts = [0,0,0,0,0,0];
   updateMath();
   updateVials();
    
    set_message("");

   // Show equal-wrong text
     document.getElementById("equal-wrong").style.display = "none";
     // show try-again button
     document.getElementById("try-again").style.display = "none";
     
   document.getElementById("button-yes").style.display = "inline";
     document.getElementById("button-no").style.display = "inline";
     document.getElementById("question-text").style.display = "inline";


   // update the other UI
}

function nextPage(){
    console.log("go to the next page here");
}

function set_vial_attrib(svgDoc, thisVialAmount){
  if(thisVialAmount != 0){
     svgDoc.getElementById("Vial-Fill").setAttribute("y", 90-thisVialAmount*20);
  } else{
     svgDoc.getElementById("Vial-Fill").setAttribute("y", 100-thisVialAmount*20);
  }
}

function updateVials(){
   var thisVialAmount = vialAmounts[0];
   var svgDoc = document.getElementById("small-vial-obj-A").contentDocument 
   set_vial_attrib(svgDoc, thisVialAmount);

  thisVialAmount = vialAmounts[1];
  svgDoc = document.getElementById("med-vial-obj-A").contentDocument 
   set_vial_attrib(svgDoc, thisVialAmount);
 
  thisVialAmount = vialAmounts[2];
  svgDoc = document.getElementById("large-vial-obj-A").contentDocument 
   set_vial_attrib(svgDoc, thisVialAmount);
 
   var thisVialAmount = vialAmounts[3];
   var svgDoc = document.getElementById("small-vial-obj-B").contentDocument 
   set_vial_attrib(svgDoc, thisVialAmount);

  thisVialAmount = vialAmounts[4];
  svgDoc = document.getElementById("med-vial-obj-B").contentDocument 
   set_vial_attrib(svgDoc, thisVialAmount);
 
  thisVialAmount = vialAmounts[5];
  svgDoc = document.getElementById("large-vial-obj-B").contentDocument 
   set_vial_attrib(svgDoc, thisVialAmount);

}

function get_math_html(vial_index){
    if (vial_index < 3){
        // In Formula A
    return vialAmounts[vial_index] + " x " + Math.pow(BASE_A, vial_index) + " = " + "<b>" + (Math.pow(BASE_A, vial_index) * vialAmounts[vial_index]) + "</b>"
    } 

    return vialAmounts[vial_index] + " x " + Math.pow(BASE_B, vial_index-3) + " = " + "<b>" + (Math.pow(BASE_B, vial_index-3) * vialAmounts[vial_index]) + "</b>"
}

function updateMath(){
  // FORMULA A
  var largeMathBelow = document.getElementById("large-math-A");
  //largeMathBelow.textContent = get_math_str(2);
  largeMathBelow.innerHTML = get_math_html(2);


  var medMathBelow = document.getElementById("med-math-A");
  //medMathBelow.textContent = get_math_str(1);
  medMathBelow.innerHTML = get_math_html(1);

  var smallMathBelow = document.getElementById("small-math-A");
  //smallMathBelow.textContent = get_math_str(0);
  smallMathBelow.innerHTML = get_math_html(0);

  // FORMULA B
  var largeMathBelow = document.getElementById("large-math-B");
  //largeMathBelow.textContent = get_math_str(2);
  largeMathBelow.innerHTML = get_math_html(5);


  var medMathBelow = document.getElementById("med-math-B");
  //medMathBelow.textContent = get_math_str(1);
  medMathBelow.innerHTML = get_math_html(4);

  var smallMathBelow = document.getElementById("small-math-B");
  //smallMathBelow.textContent = get_math_str(0);
  smallMathBelow.innerHTML = get_math_html(3);


/*
  if (GOAL_AMOUNT == curr_amount){
    // THE USER DID IT!!!!!!!!!
    resultMathElem.style.color = GREEN_COLOR;
    largeMathBelow.style.color = GREEN_COLOR;
    medMathBelow.style.color = GREEN_COLOR;
    smallMathBelow.style.color = GREEN_COLOR;
    set_message("Well done! " + curr_amount + " is 331 base 4 in base 10", true);
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
*/
}


function unfocus(index){
    //0       1        2        3       4       5
// [small-A, med-A, large-A, small-B, med-B, large-B]
    switch (index) {
    case 0:
        var svgDoc = document.getElementById("small-vial-obj-A").contentDocument 
        break;
    case 1:
        var svgDoc = document.getElementById("med-vial-obj-A").contentDocument 
        break;
    case 2:
        var svgDoc = document.getElementById("large-vial-obj-A").contentDocument 
        break;
    case 3:
        var svgDoc = document.getElementById("small-vial-obj-B").contentDocument 
        break;
    case 4:
        var svgDoc = document.getElementById("med-vial-obj-B").contentDocument 
        break;
    case 5:
        var svgDoc = document.getElementById("large-vial-obj-B").contentDocument 
        break;
    default:
        break;
    }

    svgDoc.getElementById("Highlight").setAttribute("visibility", "hidden");
    svgDoc.getElementById("Vial-Outline").setAttribute("stroke", GRAY_COLOR);
    svgDoc.getElementById("Measurment-Small").setAttribute("fill", GRAY_COLOR);
}

function focus(index){
    //0       1        2        3       4       5
// [small-A, med-A, large-A, small-B, med-B, large-B]
    switch (index) {
    case 0:
        var svgDoc = document.getElementById("small-vial-obj-A").contentDocument 
        break;
    case 1:
        var svgDoc = document.getElementById("med-vial-obj-A").contentDocument 
        break;
    case 2:
        var svgDoc = document.getElementById("large-vial-obj-A").contentDocument 
        break;
    case 3:
        var svgDoc = document.getElementById("small-vial-obj-B").contentDocument 
        break;
    case 4:
        var svgDoc = document.getElementById("med-vial-obj-B").contentDocument 
        break;
    case 5:
        var svgDoc = document.getElementById("large-vial-obj-B").contentDocument 
        break;
    default:
        break;
    }
    svgDoc.getElementById("Highlight").setAttribute("visibility", "visible");
    svgDoc.getElementById("Vial-Outline").setAttribute("stroke", BLACK_COLOR);
    svgDoc.getElementById("Measurment-Small").setAttribute("fill", BLACK_COLOR);
}

