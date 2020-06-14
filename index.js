const express = require("express");
const app = express();
const hb = require("express-handlebars");
const projJson = require("./projects.json");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

////-----------------------------Home Page------------------------------------------------//
app.get("/", (req, res) => {
    res.render("home", {
        projJson,
    });
});

////-----------------------------File-sources------------------------------------------------//

app.use(express.static("./projects"));
app.use(express.static("./public"));

////------Listen on a port------////
app.listen(8080, console.log("portfolio server listening..."));
