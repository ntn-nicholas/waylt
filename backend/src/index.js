const InitiateMongoServer = require("./db_access");
const UserSchema = require('./user_schema');

InitiateMongoServer();

/**
 * Adds a user to the database given their spotify id
 * @param spotify_id
 */
function addUser(spotify_id) {
    user = new UserSchema({ spotifyId: spotify_id });
    user.save();
}

/**
 * Gets all the users
 */
function getAllUsers() {
    return UserSchema.find();
}