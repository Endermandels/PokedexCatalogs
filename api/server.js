require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const pokemonRoutes = require('./routes/pokemon');

app.use(express.json()); // used for accepting JSON data in a request body
app.use('/pokemon', pokemonRoutes);

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

app.get("/", homePage);

function homePage(req, res) {
    res.send("TODO: Home Page");
}
