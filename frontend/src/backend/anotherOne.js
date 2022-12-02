const express = require("express");
const mongoose = require("mongoose");
const app = express();
const songChoice = require("./models/user_schema");
app.use(express.json());

const uri = "mongodb+srv://octaviolomeli:mongodbHater@cluster0.xskiqtn.mongodb.net/waylt?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log(error);
    }
}

connect();

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

app.listen(8888, () => {
    console.log("Server started on port 8888");
})

app.get("/addSong", (req, res) => {
    const song = new songChoice({
        username: "Octavio LC",
        album: "Really Cool Album",
        song: "CS",
        artist: "John Denero"
    });

    song.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})