(function() {
    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Angola",
        "Anguilla",
        "Antigua",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire (Netherlands Antilles)",
        "Bosnia Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo, The Democratic Republic of",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Curacao (Netherlands Antilles)",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iraq",
        "Ireland (Republic of)",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kosrae Island",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia (FYROM)",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Moldova",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Ponape",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Rota",
        "Russia",
        "Rwanda",
        "Saba (Netherlands Antilles)",
        "Saipan",
        "Samoa",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St. Barthelemy",
        "St. Croix",
        "St. Eustatius (Netherlands Antilles)",
        "St. John",
        "St. Kitts and Nevis",
        "St. Lucia",
        "St. Maarten (Netherlands Antilles)",
        "St. Thomas",
        "St. Vincent and the Grenadines",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Tinian",
        "Togo",
        "Tonga",
        "Tortola",
        "Trinidad and Tobago",
        "Truk",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos",
        "Tuvalu",
        "US Virgin Islands",
        "Uganda",
        "Ukraine",
        "Union Island",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Virgin Gorda",
        "Wallis and Futuna",
        "Yap",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];
    var input = $("input");
    var resultsElem = $("#results");

    input.on("input focus", function() {
        var val = input.val();

        //If inputfield value is empty string, end function and clear dropdown (we do this because both 'abc'.indexOf(''); and 'abc'.indexOf('a'); return 0)
        if (val == "") {
            resultsElem.empty();
            return;
        }

        var matches = []; //input matches
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].toLowerCase().indexOf(val.toLowerCase()) == 0) {
                matches.push(countries[i]);
                if (matches.length == 4) {
                    break; //'return' would end the function and the loop(? not sure he said it like this), break just ends the loop
                }
            }
        }

        //Adding input matches to the dorpdown results
        var resultsHtml = "";
        for (var j = 0; j < matches.length; j++) {
            resultsHtml += '<div class="result">' + matches[j] + "</div>";
            $("#results").css({
                visibility: "visible"
            });
        }

        if (resultsHtml == "") {
            resultsHtml += '<div class="result noResults">No results</div>';
        }
        resultsElem.html(resultsHtml);

        //Mouse options
        $(".result").on("mouseenter", function(e) {
            $(".result").removeClass("highlight");
            $(e.target).addClass("highlight");

            $(e.target).on("mouseleave", function(b) {
                $(b.target).removeClass("highlight");
            });

            $(e.target).on("mousedown", function() {
                var text = $(e.target).html();
                if (text == "No results") {
                    return;
                } else {
                    input.val(text);
                }
                $("#results").css({
                    visibility: "hidden"
                });
            });
        });

        //Keyboard options
        var indexNr = -1;
        input.on("keydown", function(e) {
            //Down-arrow
            if (e.keyCode == 40) {
                if (indexNr == $(".result").length - 1) {
                    return;
                } else {
                    $(".result").removeClass("highlight");

                    indexNr++;
                    $(".result")
                        .eq(indexNr)
                        .addClass("highlight");
                }
            }

            //Up-arrow
            if (e.keyCode == 38) {
                if (indexNr == 0) {
                    return;
                } else {
                    $(".result").removeClass("highlight");

                    indexNr--;
                    $(".result")
                        .eq(indexNr)
                        .addClass("highlight");
                }
            }

            //Enter/return key
            if (e.keyCode == 13) {
                var text = $(".highlight").html();
                if (text == "No results") {
                    return;
                } else {
                    input.val(text).html();
                    $("#results").css({
                        visibility: "hidden"
                    });
                }
            }
        });

        //Blur, Click outside of results
        input.on("blur", function() {
            $("#results").css({
                visibility: "hidden"
            });
        });
    });
})();
