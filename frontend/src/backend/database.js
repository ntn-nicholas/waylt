const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const songChoice = require("./models/user_schema");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const uri =
  "mongodb+srv://octaviolomeli:mongodbHater@cluster0.xskiqtn.mongodb.net/waylt?retryWrites=true&w=majority";

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
  res.json({ message: "API Working OK" });
});

app.listen(8888, () => {
  console.log("Server started on port 8888");
});

app.post("/addSong", (req, res) => {
  const song = new songChoice({
    username: req.body.username,
    album: req.body.album,
    song: req.body.song,
    artist: req.body.artist,
    url: req.body.url,
    uri: req.body.uri,
  });

  song
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/retrieveData", (req, res) => {
  songChoice
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
