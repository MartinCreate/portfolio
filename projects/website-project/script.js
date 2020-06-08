var hbbutton = document.getElementById("hbmenu");
var hm = document.getElementById("hamburger-menu");
var hbmenuX = document.getElementById("x");
var menu = document.getElementById("menu");

//opening menu
hbbutton.addEventListener("click", function() {
    hm.classList.add("on");
});

//Closing menu
//closing with x
hbmenuX.addEventListener("click", function() {
    hm.classList.remove("on");
});

//closing with click outside of menu
hm.addEventListener("click", function() {
    hm.classList.remove("on");
});

menu.addEventListener("click", function(e) {
    e.stopPropagation();
});

//Modal Box, Popup and closing
var modal = $("#modal");
var X = $("#x2");
var modalBox = $("#modalBox");

//Popup
(function() {
    setTimeout(function() {
        modal.css({
            visibility: "visible"
        });
    }, 1000);
})();

//Closing Modal
//closing with x
X.on("click", function() {
    $("#modal").css({
        visibility: "hidden"
    });
});

// // closing with click outside of menu
// modal.on("click", function() {
//     $("#modal").css({
//         visibility: "hidden"
//     });
// });

// modalBox.on("click", function(e) {
//     e.stopPropagation();
// });
