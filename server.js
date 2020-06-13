const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 6000
global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({ extend: true }));
app.use(express.json());

function handleRequest(req, res) {
    res.end("The Darkhorse is coming")
};

const server = http.createServer(handleRequest);

server.listen(PORT, function () {
    console.log("I'm listening Nick")
});

app.get("/", (req, res) => {
    res.sendfile(path.join(appRoot) + "/public/", "index.html")
});
app.get("/notes", (req, res) => {
    res.sendfile(path.join(appRoot) + "/public/", "notes.html")
});
app.get("/api/notes", (req, res) => {
    let notes = fs.readFileSync("/db/db.json", "utf-8", function (err, data) {
        if (err) throw (err);
        return data;
    })
    return res.json(JSON.parse(notes));
});