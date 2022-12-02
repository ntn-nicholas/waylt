const mongoose = require('mongoose');

const songChoiceSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
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
        required: true
    }
});

const songChoice = mongoose.model("songChoice", songChoiceSchema);
module.exports = songChoice;