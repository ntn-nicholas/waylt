const mongoose = require("mongoose");

const songChoiceSchema = mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  album: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  uri: {
    type: String,
    required: false,
  },
});

const songChoice = mongoose.model("songChoice", songChoiceSchema);
module.exports = songChoice;
