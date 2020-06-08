(function() {
    var kitties = document.querySelectorAll("#kitties img");
    var dots = document.querySelectorAll("#dots .dot");
    var timer; //keeps track of which setTimeout is currently running. (each instance of setTimeout returns an id)
    var isTrans;

    //Buttons
    for (i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", clickHandler(i));
    }

    function clickHandler(dotIndex) {
        return function() {
            if (isTrans || dotIndex == n) {
                //'if a transition is currently in progress or the kitty on-screen corresponds to the button you're currently pushing')
                return; //just having 'return' means the function does nothing
            } else {
                clearTimeout(timer); //cancels the currently running setTimeout
                moveKitties(dotIndex); //shows kittie image associated with index number of dot
            }
        };
    }

    //Make kitties go from off-screen right to onscreen to off-screen left (also changes button fills)
    var n = 0;
    function moveKitties(index) {
        kitties[n].classList.remove("onscreen");
        dots[n].classList.remove("on");
        kitties[n].classList.add("offscreen-left");
        isTrans = true;

        if (typeof index == "number") {
            n = index;
        } else {
            n++;
        }

        if (n > kitties.length - 1) {
            n -= kitties.length;
        }

        kitties[n].classList.add("onscreen");
        dots[n].classList.add("on");
    }

    //Makes kitties go from off-screen left back to off-screen right
    document.addEventListener("transitionend", function(e) {
        isTrans = false;
        if (e.target.className == "offscreen-left") {
            e.target.classList.remove("offscreen-left");
            timer = setTimeout(moveKitties, 1000);
        }
    });

    timer = setTimeout(moveKitties, 1000);
})();
