(function() {
    var bar = $(".bar");
    var body = $("body");
    var contLeft = $(".container").offset().left;
    var x2 = contLeft + $("img").outerWidth();

    bar.on("mousedown", function() {
        //attempt at stopping the function once the mouse is lifte

        //Moving the bar and image
        body.on("mousemove", function(e) {
            //Only run function while mouse is pressed down
            body.on("mouseup", function() {
                body.off("mousemove");
            });

            //Cover/uncover image & move bar
            var x = e.clientX - bar.outerWidth() - contLeft;

            $(".top-image").css({
                width: x + "px"
            });

            bar.css({
                left: x + "px"
            });

            //Limit left/right bar movement
            //left-side limit
            if (x <= 0) {
                bar.css({
                    left: 0
                });
            }

            //right-side limit
            if (x + contLeft >= x2) {
                bar.css({
                    left: $("img").outerWidth() - bar.outerWidth() + "px"
                });
            }
        });
    });
})();
