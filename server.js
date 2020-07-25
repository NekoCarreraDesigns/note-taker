const express = require("express");
const fs = require("fs");
const path = require("path");
const compression = require("compression")

const app = express();
app.use(compression({ filter: shouldCompress }))
const PORT = process.env.PORT || 3000;
global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

class Note {
    constructor(id, text, title) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname) + "/public/" + "index.html")
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname) + "/public/" + "notes.html")
});

app.get("/api/notes", (req, res) => {
    let notes = fs.readFileSync("./db/db.json", "utf-8", function (err, data) {
        if (err) throw (err);
        return data;
    })
    return res.json(JSON.parse(notes));
});
//delete function is broken
app.post("/api/notes", function (req, res) {
    let notes = fs.readFileSync("./db/db.json", "utf-8", function (err, data) {
        if (err) throw err;
        return data;
    });
    let newId = JSON.parse(notes).length + 1;
    let savedNotes = JSON.parse(notes);

    let newNote = new Note(newId, (req.body.title), (req.body.text));
    savedNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), (err) => {
        throw err;
    });
    res.sendFile(path.join(appRoot) + "/public/" + "notes.html");
});

app.delete("/api/notes/:id", async function (req, res) {

    let del = parseInt(req.params.id);
    let data = fs.readFileSync("./db/db.json", "utf-8", err => { return err });
    let json = JSON.parse(data);
    let len = json.length;
    let newNoteArr = json.filter(note => { return note.id !== del });
    fs.writeFileSync("./db/db.json", JSON.stringify(newNoteArr), (err) => { return err });
    res.sendFile(path.join(appRoot) + "/public/", "notes.html");

});

app.listen(PORT, function () {
    console.log("I'm listening on PORT:" + PORT)
});