const express = require("express")
const http = require("http")

const app = express();
const PORT = 3000

function handleRequest(req, res) {
    res.end("The Darkhorse is coming")
}

const server = http.createServer(handleRequest)

server.listen(PORT, function () {
    console.log("I'm listening Nick")
})

app.get("/", (req, res) => {
    res.send("index.html")
})
app.get("/notes", (req, res) => {
    res.send("notes.html")
})