document.getElementById("chapter1").addEventListener("mouseover", function(){
    document.getElementById("chapter1-svg").data = "images/Chapter-1-Highlight.svg";
    document.getElementById("description").textContent = "You've slept through a lot. It's time to wake up and figure out what's going on.";
    document.getElementById("description").style.visibility = "visible";
    updateText();
});
document.getElementById("chapter1").addEventListener("mouseout", function(){
    document.getElementById("chapter1-svg").data = "images/Chapter-1.svg";
    document.getElementById("description").style.visibility = "hidden";
});



document.getElementById("chapter2").addEventListener("mouseover", function(){
    document.getElementById("chapter2-svg").data = "images/Chapter-2-Highlight.svg";
    document.getElementById("description").textContent = "Let's learn about bases. Get your lab coat because you're about to get hands on.";
    document.getElementById("description").style.visibility = "visible";
});
document.getElementById("chapter2").addEventListener("mouseout", function(){
    document.getElementById("chapter2-svg").data = "images/Chapter-2.svg";
    document.getElementById("description").style.visibility = "hidden";
});


document.getElementById("chapter3").addEventListener("mouseover", function(){
    document.getElementById("chapter3-svg").data = "images/Chapter-3-Highlight.svg";
    document.getElementById("description").textContent = "Start learning how to convert bases by crunching the numbers. Don't forget your calculator.";
    document.getElementById("description").style.visibility = "visible";
});
document.getElementById("chapter3").addEventListener("mouseout", function(){
    document.getElementById("chapter3-svg").data = "images/Chapter-3.svg";
    document.getElementById("description").style.visibility = "hidden";
});

document.getElementById("chapter4").addEventListener("mouseover", function(){
    document.getElementById("chapter4-svg").data = "images/Chapter-4-Highlight.svg";
    document.getElementById("description").textContent = "The world is in trouble and you're the only hope. It's time for you to save the world.";
    document.getElementById("description").style.visibility = "visible";
});
document.getElementById("chapter4").addEventListener("mouseout", function(){
    document.getElementById("chapter4-svg").data = "images/Chapter-4.svg";
    document.getElementById("description").style.visibility = "hidden";
});
