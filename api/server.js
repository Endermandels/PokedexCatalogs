require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

app.get("/", onLoad);

function onLoad(req, res) {
    res.send("Hello world");
}