const InitiateMongoServer = require("./db_access");
const UserSchema = require('./user_schema');
const { getTokenFromUrl } = require("./login");

InitiateMongoServer();

/**
 * Adds a user to the database given their spotify id
 * @param spotify_id
 */
function addUser(spotify_id) {
    let user = new UserSchema({ spotifyId: spotify_id });
    user.save();
}

/**
 * Gets all the users
 */
function getAllUsers() {
    return UserSchema.find();
}

/**
 * Gets all the spotify data for a user with a given spotify_id
 * @param spotify_id
 */
function getDataForUser(spotify_id) {

}