(function() {
    var currentPlayer = "player1";
    var currentHover = "hovP1";
    var sideArrowInd = -1;
    var winScreen = $(".victoryScreen");
    var tieScreenCss = $(".tieScreen");
    var winText = $("#winner");
    var cols = $(".column");
    var blueScore = 0;
    var redScore = 0;

    $(".column").on("click", function(e) {
        $("." + currentHover).removeClass(currentHover);

        var col = $(e.currentTarget);
        var slotsInCol = col.children(); //.children() is a jQuery method
        // Iterate through all slots (starting from bottom) in clicked-on column, finding first available slot
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            //"if the current slot doesn't have a player class (i.e. a chip)", assign it the currentPlayer's class
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        var slotsInRow = $(".row" + i); //becomes $('.row5') (if i == 5)

        //Full-Column-Bug avoider
        if (i === -1) {
            return;
        }

        ////--------VICTORY CHECK--------////

        function victoryScreen() {
            winScreen.css({
                visibility: "visible"
            });
            winText.html(winner + " Wins!");
            if (winner == "Blue") {
                blueScore++;
                $("#" + winner.toLowerCase() + "Wins").html(blueScore);
            }
            if (winner == "Red") {
                redScore++;
                $("#" + winner.toLowerCase() + "Wins").html(redScore);
            }
        }

        var winner;
        if (currentPlayer == "player1") {
            winner = "Blue";
        } else if (currentPlayer == "player2") {
            winner = "Red";
        }

        function tieScreen() {
            tieScreenCss.css({
                visibility: "visible"
            });
        }

        if (
            checkForVictory(slotsInCol) ||
            checkForVictory(slotsInRow) ||
            uLdR() ||
            dLuR()
        ) {
            victoryScreen();
        } else if ($(".player1").length + $(".player2").length == 42) {
            tieScreen();
        } else {
            switchPlayer();
        }

        ////--------DIAGONAL VICTORY CHECK--------////
        //////d/u: down/up, R/L: right/left. e.g. uLdR: upLeft to downRight diagonal
        function uLdR() {
            var count = 0;
            var colIndex = $(e.currentTarget).index();
            var rowIndex = i;
            colIndex -= 4;
            rowIndex -= 4;
            for (var c = 0; c < 8; c++) {
                colIndex++;
                rowIndex++;
                if (
                    cols
                        .eq(colIndex)
                        .children()
                        .eq(rowIndex)
                        .hasClass(currentPlayer)
                ) {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }

        function dLuR() {
            var count = 0;
            var colIndex = $(e.currentTarget).index();
            var rowIndex = i;
            colIndex -= 4;
            rowIndex += 4;
            for (var c = 0; c < 8; c++) {
                colIndex++;
                rowIndex--;
                if (
                    cols
                        .eq(colIndex)
                        .children()
                        .eq(rowIndex)
                        .hasClass(currentPlayer)
                ) {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }

        sideArrowInd = -1;
    });

    ////----COLUM SLOT ITERATOR----////
    //iterates through a specified column's slots, from bottum to top, and assigns specified class to first empty slot
    function colSlotIterator(currentCol, currentHovOrPl) {
        for (var i = currentCol.length - 1; i >= 0; i--) {
            if (
                !currentCol.eq(i).hasClass("player1") &&
                !currentCol.eq(i).hasClass("player2")
            ) {
                currentCol.eq(i).addClass(currentHovOrPl);
                break;
            }
        }
    }

    ////--------MOUSEHOVER INDICATOR--------////
    $(".column").on("mousemove", function(k) {
        $(".reset").removeClass("resetHighlight");
        $(".nextGame").removeClass("nextGameHighlight");
        $("." + currentHover).removeClass(currentHover);
        var hovCol = $(k.currentTarget).children();
        colSlotIterator(hovCol, currentHover);
    });

    $(".column").on("mouseleave", function() {
        $("." + currentHover).removeClass(currentHover);
        sideArrowInd = -1;
    });

    $(".nextGame").on("mouseenter", function() {
        $(".reset").removeClass("resetHighlight");
    });

    $(".reset").on("mouseenter", function() {
        $(".nextGame").removeClass("nextGameHighlight");
    });

    ////--------NEXT GAME--------////
    $(".nextGame").on("click", function() {
        $("." + currentHover).removeClass(currentHover);

        winScreen.css({
            visibility: "hidden"
        });
        tieScreenCss.css({
            visibility: "hidden"
        });

        setTimeout(removePlayers, 2000);

        currentPlayer = "player1";
        currentHover = "hovP1";

        $(".board").addClass("nextGameAnim");

        setTimeout(removeAnim, 2300);
    });

    ////--------RESET SCORE--------////
    $(".reset").on("click", function() {
        $("." + currentHover).removeClass(currentHover);

        winScreen.css({
            visibility: "hidden"
        });
        tieScreenCss.css({
            visibility: "hidden"
        });

        setTimeout(resetScore, 300);

        setTimeout(removePlayers, 300);

        currentPlayer = "player1";
        currentHover = "hovP1";

        $(".board").addClass("resetAnimBoard");
        $(".scoreBall").addClass("resetAnim");

        setTimeout(removeAnim, 1000);
    });

    function removeAnim() {
        $(".board").removeClass("nextGameAnim");
        $(".board").removeClass("resetAnimBoard");
        $(".scoreBall").removeClass("resetAnim");
    }

    function resetScore() {
        redScore = 0;
        $("#redWins").html(0);

        blueScore = 0;
        $("#blueWins").html(0);
    }

    function removePlayers() {
        $(".slot")
            .removeClass("player1")
            .removeClass("player2");
    }

    function checkForVictory(slots) {
        var count = 0;
        //iterate through row/col
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                //"victory: if 4 (consecutive) currentPlayer-slots are found, return true"
                if (count === 4) {
                    return true;
                }
            } else {
                //reset the count back to zero because it found the other player (or no player)
                count = 0;
            }
        }
    }

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
            currentHover = "hovP2";
        } else {
            currentPlayer = "player1";
            currentHover = "hovP1";
        }
    }

    ////--------KEYBOARD INPUTS--------////

    $("body").on("keydown", function(e) {
        //Up/Down Arrow
        if (e.keyCode == 38 || e.keyCode == 40) {
            sideArrowInd = -1;
            $("." + currentHover).removeClass(currentHover);

            $();
            if (
                $(".resetHighlight").length == 0 &&
                $(".nextGameHighlight").length == 0
            ) {
                $(".nextGame").addClass("nextGameHighlight");
            } else if ($(".nextGameHighlight").length == 1 && e.keyCode == 40) {
                $(".nextGame").removeClass("nextGameHighlight");
                $(".reset").addClass("resetHighlight");
            } else if ($(".resetHighlight").length == 1 && e.keyCode == 38) {
                $(".nextGame").addClass("nextGameHighlight");
                $(".reset").removeClass("resetHighlight");
            }
        }

        //Right Arrow
        if (e.keyCode == 39) {
            $(".nextGame").removeClass("nextGameHighlight");
            $(".reset").removeClass("resetHighlight");
            if (sideArrowInd >= 6) {
                sideArrowInd = -1;
            }
            sideArrowInd++;

            //Skipping Full Columns
            while (
                (cols
                    .eq(sideArrowInd)
                    .children()
                    .eq(0)
                    .hasClass("player1") ||
                    cols
                        .eq(sideArrowInd)
                        .children()
                        .eq(0)
                        .hasClass("player2")) &&
                sideArrowInd < 6
            ) {
                sideArrowInd++;
                if (sideArrowInd > 6) {
                    sideArrowInd = 0;
                }
            }

            $("." + currentHover).removeClass(currentHover);
            var currColR = cols.eq(sideArrowInd).children();
            colSlotIterator(currColR, currentHover);
        }

        //Left Arrow
        if (e.keyCode == 37) {
            $(".nextGame").removeClass("nextGameHighlight");
            $(".reset").removeClass("resetHighlight");
            if (sideArrowInd == 0) {
                sideArrowInd = 7;
            }
            if (sideArrowInd == -1) {
                sideArrowInd = 7;
            }

            sideArrowInd--;

            //Skipping Full Columns
            while (
                (cols
                    .eq(sideArrowInd)
                    .children()
                    .eq(0)
                    .hasClass("player1") ||
                    cols
                        .eq(sideArrowInd)
                        .children()
                        .eq(0)
                        .hasClass("player2")) &&
                sideArrowInd > 0
            ) {
                sideArrowInd--;
                if (sideArrowInd < 0) {
                    sideArrowInd = 6;
                }
            }

            $("." + currentHover).removeClass(currentHover);
            var currColL = cols.eq(sideArrowInd).children();
            colSlotIterator(currColL, currentHover);
        }

        ////--------Enter/Space-------////
        if (e.keyCode == 13 || e.keyCode == 32) {
            //Pushing Replay or Reset Score Buttons
            if ($(".nextGameHighlight").length == 1) {
                $(".nextGame").trigger("click");
            }
            if ($(".resetHighlight").length == 1) {
                $(".reset").trigger("click");
            }

            //Making a play
            if ($("." + currentHover).length == 1) {
                $("." + currentHover).addClass(currentPlayer);
                $("." + currentHover).removeClass(currentHover);

                //Finding RowIndex: in findRowInd(), i is the row-index Nr of the slot we just played in
                var colKey = cols.eq(sideArrowInd).children();
                function findRowInd() {
                    for (var i = colKey.length - 1; i >= -1; i--) {
                        if (i == -1) {
                            return i + 1;
                        } else if (
                            !colKey.eq(i).hasClass("player1") &&
                            !colKey.eq(i).hasClass("player2")
                        ) {
                            return (i += 1);
                        }
                    }
                }
                var iRow = findRowInd();

                var slotsInColKey = colKey;
                var slotsInRowKey = $(".row" + iRow);

                ////--------ENTER/SPACE VICTORY CHECK--------////

                function victoryScreen() {
                    winScreen.css({
                        visibility: "visible"
                    });
                    winText.html(winner + " Wins!");
                    if (winner == "Blue") {
                        blueScore++;
                        $("#" + winner.toLowerCase() + "Wins").html(blueScore);
                    }
                    if (winner == "Red") {
                        redScore++;
                        $("#" + winner.toLowerCase() + "Wins").html(redScore);
                    }
                }

                function tieScreen() {
                    tieScreenCss.css({
                        visibility: "visible"
                    });
                }

                var winner;
                if (currentPlayer == "player1") {
                    winner = "Blue";
                } else if (currentPlayer == "player2") {
                    winner = "Red";
                }

                if (
                    checkForVictory(slotsInColKey) ||
                    checkForVictory(slotsInRowKey) ||
                    uLdR() ||
                    dLuR()
                ) {
                    victoryScreen();
                } else if ($(".player1").length + $(".player2").length == 42) {
                    tieScreen();
                } else {
                    switchPlayer();
                }

                ////--------ENTER/SPACE DIAGONAL VICTORY CHECK--------////
                ////d/u: down/up, R/L: right/left. e.g. uLdR: upLeft to downRight diagonal
                function uLdR() {
                    var count = 0;
                    var colIndex = sideArrowInd;
                    var rowIndex = iRow;
                    colIndex -= 4;
                    rowIndex -= 4;
                    for (var c = 0; c < 8; c++) {
                        colIndex++;
                        rowIndex++;
                        if (
                            cols
                                .eq(colIndex)
                                .children()
                                .eq(rowIndex)
                                .hasClass(currentPlayer)
                        ) {
                            count++;
                            if (count === 4) {
                                return true;
                            }
                        } else {
                            count = 0;
                        }
                    }
                }

                function dLuR() {
                    var count = 0;
                    var colIndex = sideArrowInd;
                    var rowIndex = iRow;
                    colIndex -= 4;
                    rowIndex += 4;
                    for (var c = 0; c < 8; c++) {
                        colIndex++;
                        rowIndex--;
                        if (
                            cols
                                .eq(colIndex)
                                .children()
                                .eq(rowIndex)
                                .hasClass(currentPlayer)
                        ) {
                            count++;
                            if (count === 4) {
                                return true;
                            }
                        } else {
                            count = 0;
                        }
                    }
                }
                sideArrowInd = -1;
            }
        }
    });
})();

//---------//---------DIAGONALS---------//---------//
//SYSTEMATIC APPROACH
// wherever the user places the user placed the chip, you check the 4 diagonals

//------ +7 +5 APPROACH ------
//go up right and down right
//make sure to check whether the 4 columns

//------ EASYPEASY APPROACH ------
//create array containing arrays with all possible diagonal victory possibilities (there are only 24)

// //------ THE X APPROACH ------
// //navigating the x (where the intersection is the div where the player currently inserted a chip)
// var cols = $(".column");
// cols.eq(col)
//     .children()
//     .eq(row);

// //how to make a jQuery object with arbitrary elements (maybe optional)
// var myObj = $();
// myObj = myObj.add($("div").eq(0));
// myObj = myObj.add($("p").eq(0));

//------ position APPROACH ------//
// see website
