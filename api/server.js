const express = require("express");

const apiRouter = require("./router.js") // import router here 

const server = express();

server.get("/", (req, res) => {
    res.send(`
        <h2>Lambda</h2>
        <p>Node API Project 2</p>
    `);
});

server.use("/api/posts", apiRouter)

module.exports = server;