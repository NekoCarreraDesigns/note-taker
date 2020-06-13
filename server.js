const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5500
global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({ extend: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendfile(path.join(appRoot) + "/public/", "index.html")
});

app.get("/notes", (req, res) => {
    res.sendfile(path.join(appRoot) + "/public/", "notes.html")
});

app.get("/api/notes", (req, res) => {
    let notes = fs.readFileSync("./db/db.json", "utf-8", function (err, data) {
        if (err) throw (err);
        return data;
    })
    return res.json(JSON.parse(notes));
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
})



app.listen(PORT, function () {
    console.log("I'm listening on" + PORT)
});