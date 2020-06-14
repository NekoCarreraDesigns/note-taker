const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const uuid = require("uuid/v4")

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

app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err);

        const allNotes = JSON.parse(data);
        const newAllNotes = allNotes.filter(note => note.id != noteId)

        fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), (err) => {
            if (err) throw (err);
            res.send(db);
            console.log("Note Deleted");
        });
    });
});


app.post("/api/notes", (req, res) => {
    let noteId = uuid();
    let newNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err);

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), err => {
            if (err) throw (err);
            res.send(db);
            console.log("Note created")
        });

    });

});


app.listen(PORT, function () {
    console.log("I'm listening on PORT:" + PORT)
});