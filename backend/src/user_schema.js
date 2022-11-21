const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    spotifyId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('user', UserSchema);