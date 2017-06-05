

var BASE = 10;
var total = 103;
var done = 0;

 var largevial = document.getElementById("largevial");
 var largeHeight = parseInt(largevial.getAttribute("height"));
 var largeWidth = parseInt(largevial.getAttribute("width"));
 document.getElementById("large-div").style.height = largeHeight+30+"px";
 document.getElementById("large-div").style.width = largeWidth+30+"px";

 var medvial = document.getElementById("medvial");
 var medHeight = parseInt(medvial.getAttribute("height"));
 var medWidth = parseInt(medvial.getAttribute("width"));
 document.getElementById("med-div").style.height = medHeight+30+"px";
 document.getElementById("med-div").style.width = medWidth+30+"px";

 var svgDoc = document.getElementById("smallvial-object");
 var smallHeight = parseInt(smallvial.getAttribute("height"));
 var smallWidth = parseInt(smallvial.getAttribute("width"));
 document.getElementById("small-div").style.height = smallHeight+30+"px";
 document.getElementById("small-div").style.width = smallWidth+30+"px";

//Increments by 20
var smallVial = 0
document.getElementById("smallVialNum").innerHTML = smallVial;
var medVial = 0
document.getElementById("medVialNum").innerHTML = medVial;
var largeVial = 0
document.getElementById("largeVialNum").innerHTML = largeVial;
var vialFill = document.getElementById("totalVial");
vialFill.innerHTML = total;


function updateNumDisplays(){
  document.getElementById("smallVialNum").innerHTML = smallVial;
  var vialFill = document.getElementById("Vial-Fill-Small");
  vialFill.setAttribute("y", 200-smallVial*20)

  document.getElementById("medVialNum").innerHTML = medVial;
  var vialFill = document.getElementById("Vial-Fill-Med");
  vialFill.setAttribute("y", 200-medVial*20)

  document.getElementById("largeVialNum").innerHTML = largeVial;
  var vialFill = document.getElementById("Vial-Fill-Large");
  vialFill.setAttribute("y", 200-largeVial*20)

  var vialFill = document.getElementById("totalVial");
  vialFill.innerHTML = total;
}

function fillSmallVial(){
  if (smallVial < BASE && medVial != BASE && total > 0){
    total--;
    smallVial++;
    updateNumDisplays();
    if (total == 0 && smallVial != BASE) {
      showSuccess();
    }
  }
  if (done != 1) {
    if (smallVial % BASE == 0) {
      showDragMessage();
    } else {
      showFillMessage();
    }
  }
}

function showSuccess() {
  document.getElementById("success").className = "row";
  document.getElementById("dialogue").innerHTML = "You did it! Notice how each vial is a different place digit? <br> Continue to next page for full explanation!";
  document.getElementById("dialogue").className = "text-success";
  done = 1;
}

function showFillMessage() {
  document.getElementById("dialogue").innerHTML = "Keep filling the small vial <br> by clicking on the faucet number!";
  document.getElementById("dialogue").className = "text";
}

function showDragMessage() {
  document.getElementById("dialogue").innerHTML = "The small vial's full! <br> Drag the small vial to the medium vial!";
  document.getElementById("dialogue").className = "text-danger";
}

function makeVialDraggable(){
   document.getElementById("med-div").className = "draggable drag-drop vial";
   document.getElementById("large-div").className = "dropzone vial";
}

function emptyMedVial() {
  console.log("here");
  largeVial += 1;
  medVial = 0;
  updateNumDisplays();
  console.log(largeVial);
  document.getElementById("med-div").className = "dropzone vial";
  document.getElementById("large-div").className = "vial";
}



interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '#small-div, #med-div',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    // draggableElement.classList.add('can-drop');
    // draggableElement.textContent = 'Dragged in';

  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
   //Increments by 20
   //Set increment value to 0 after 
    if (smallVial == BASE) {
      medVial += 1;
      smallVial = 0;
      updateNumDisplays();
      showFillMessage();
      if (medVial == BASE) {
        makeVialDraggable();
      }
      if (total == 0) {
        showSuccess();
      }
    } else if (medVial == BASE) {
      emptyMedVial();
    }
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = 'Dropped';
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true, // was true
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: -0.3, left: 0, bottom: 10, right: 10}
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      // var textEl = event.target.querySelector('p');

      // textEl.textContent = 'moved a distance of '+ (Math.sqrt(event.dx * event.dx + event.dy * event.dy)|0) + 'px';
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;


    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;




