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

////-----------------------------Description Page for each project------------------------------------------------//

// app.get("/:project/description", (req, res) => {
//     console.log("/:project/: ", req.params.project);

//     const { project } = req.params;
//     const selectedProject = projJson.find((item) => item.directory == project);
//     console.log("projJson: ", projJson);
//     console.log("selectedProject: ", selectedProject);
//     if (!selectedProject) {
//         return res.sendStatus(404);
//     } else {
//         res.render("description", {
//             projJson,
//             selectedProject,
//         });
//     }
// });

////-----------------------------File-sources------------------------------------------------//

app.use(express.static("./projects"));
app.use(express.static("./public"));

////------Listen on a port------////
app.listen(8080, console.log("ehportfolio server listening..."));
