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
