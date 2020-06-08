(function() {
    var headlines = document.getElementById("headlines");
    var links = document.getElementsByTagName("a");
    var left = headlines.offsetLeft;
    var aniFrame;

    function moveHeadLines() {
        left--;

        if (left < -links[0].offsetWidth) {
            left += links[0].offsetWidth;
            links[0].parentNode.appendChild(links[0]); //takes the first node (that has moved off-screen to the left), removes it, then puts it back to the beginning. it's better to use the getElementsByTagName that querySelectorAll, because the array by tagname will has the approapriate index: value pairs throughout the whole process.
        }

        headlines.style.left = left + "px"; //could also use ... = `${left}px`;

        aniFrame = requestAnimationFrame(moveHeadLines); //you're using the function as an object, not calling it, therefore movedHeadLines doesn't need the (). the requestAnimationFRame calls it.
    }

    moveHeadLines();

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", function() {
            cancelAnimationFrame(aniFrame); //since the aniFrame was declared outside of the function, it is accessible everywhere. If it is assigned a new value within a function, it will have that new value globally, therefore it is accessible in this new function.
        });

        links[i].addEventListener("mouseleave", function() {
            moveHeadLines();
        });
    }
})();

//the purpose of the IIFE is to keep all the variables local (in case we have multiple .js files in an html document).
