const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const HTMLParser = require("node-html-parser");
const router = express.Router();
var SpotifyWebApi = require("spotify-web-api-node");
const nodemailer = require("nodemailer");

var spotifyApi = new SpotifyWebApi({
  clientId: "17ee1ba67e574284b8df55d5bef22f6c",
  clientSecret: "a96df23fb99745e1b4d87f7554839320",
  redirectUri: `http://localhost:8888/callback`,
});

router.get("/", (req, res, next) => {
  res.redirect(
    spotifyApi.createAuthorizeURL([
      "user-read-recently-played",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-read-email",
      "user-read-private",
      "user-follow-read",
    ])
  );
});

router.get("/callback", (req, res, next) => {
  spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
    console.log(response.body);
    spotifyApi.setAccessToken(response.body.access_token);
    // change the url of the line below to any of the other routes to demo them
    res.redirect("/getFollowers");
  });
});

// create a playlist and add user's recently played track into it
router.get("/createPlaylist", (req, res, next) => {
  spotifyApi
    .createPlaylist("Playlist Title Example", {
      description: "WAYLT generated playlist from friends",
      public: true,
    })
    .then((createdPlaylistData) => {
      spotifyApi
        .getMyRecentlyPlayedTracks({ limit: 1 })
        .then((recentTrackData) => {
          spotifyApi
            .addTracksToPlaylist(createdPlaylistData.body.id, [
              recentTrackData.body.items[0].track.uri,
            ])
            .then((d2) => {
              res.send("Created playlist and added track.");
            });
        });
    });
});

// get a user's followers
router.get("/getFollowers", (req, res, next) => {
  spotifyApi.getMe().then((selfData) => {
    const url = `https://open.spotify.com/user/${selfData.body.id}/followers`;
    var friends_ids = [];

    (async function main() {
      const browser = await puppeteer.launch();
      const [page] = await browser.pages();

      await page.goto(url, { waitUntil: "networkidle0" });
      const htmlString = await page.evaluate(
        () => document.querySelector("*").outerHTML
      );

      const root = HTMLParser.parse(htmlString);

      friends_ids = root.querySelectorAll(".Nqa6Cw3RkDMV8QnYreTr");
      for (var i = 0; i < friends_ids.length; i++) {
        friends_ids[i] = friends_ids[i].getAttribute("href").slice(6);
      }
      await browser.close();
      console.log(friends_ids);
      res.send(friends_ids);
    })();
  });
});

// send an email
router.get("/sendEmail", (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "waylt.project@gmail.com",
      pass: "vszfepsysiqcpkcp",
    },
  });

  spotifyApi.getMe().then(
    (selfData) => {
      const mailOptions = {
        from: "waylt.project@gmail.com",
        to: selfData.body.email,
        subject: "Daily Recap",
        text: "Your daily recap is available, watch it now!",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.send("Email sent to: " + selfData.body.email);
        }
      });
    },
    (err) => {
      console.log("Something went wrong!", err);
    }
  );
});

// time listened per genre
router.get("/statistics", (req, res, next) => {
  // get songs played from 12am today to now
  var miliseconds_from_morning = new Date();
  miliseconds_from_morning.setHours(0, 0, 0);
  var dailyStatistics = {};

  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 50,
      after: miliseconds_from_morning.getTime(),
    })
    .then((data) => {
      for (var i = 0; i < data.body.items.length; i++) {
        var song = data.body.items[i].track;
        var last = i == data.body.items.length - 1;
        for (const artist of song.artists) {
          spotifyApi.getArtist(artist.id).then((artist_data) => {
            if (artist_data.body.genres) {
              if (artist_data.body.genres[0] in dailyStatistics) {
                dailyStatistics[artist_data.body.genres[0]] += song.duration_ms;
              } else {
                dailyStatistics[artist_data.body.genres[0]] = song.duration_ms;
              }
            }
            if (last && artist == song.artists.at(-1)) {
              res.send(JSON.stringify(applyConversion(dailyStatistics)));
            }
          });
        }
      }
    });
  res.send("Done");
});

// returns the current user's info
router.get("/userInfo", (req, res, next) => {
  spotifyApi.getMe().then((selfData) => {
    res.send(JSON.stringify(selfData.body));
  });
});

app.use("/", router);

app.listen(8888, () => {
  console.log("App is running.");
});

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function applyConversion(d) {
  for (const [key, value] of Object.entries(d)) {
    d[key] = millisToMinutesAndSeconds(value);
  }
  return d;
}