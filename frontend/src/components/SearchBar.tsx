import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Song from "./Song";
import Image from "./Image";
import Feed from "./Feed";
import { loginUrl } from "../backend/login";
import axios from "axios";

const CLIENT_ID = "86aa68066b214479b85958aa0912c9e6";
const CLIENT_SECRET = "bb6e78f6edc54c1cb764bfcb1bbe75fd";

function SearchBar() {
  const [userName, setUsername] = useState("");
  const [seeSearch, setSeeSearch] = useState("hidden");
  const [seeWelcome, setSeeWelcome] = useState("visible");
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [songSubmitted, setSongSubmitted] = useState(false);
  const [seen, setSeen] = useState("hidden");
  const [seenCard, setSeenCard] = useState("hidden");
  const [songList, setSongList] = useState<any>([]);
  const [songTitle, setSongTitle] = useState("");
  const [artistOfSong, setArtistOfSong] = useState("");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [imageURL, setImageURL] = useState<string>("");
  // const [uri, setURI] = useState("");

  useEffect(() => {
    const loggedIn = window.location.href !== "http://localhost:3000/";

    if (
      loggedIn ||
      document.getElementById("login-button")!.innerHTML === "Log Out"
    ) {
      document.getElementById("login-button")!.innerHTML = "Log Out";
      // document.getElementById("nav-activity")!.innerHTML = "";
      document.getElementById("nav-feed")!.innerHTML = "Feed";
      setSeeSearch("visible");
      setSeeWelcome("hidden");
      // call octavios backend
    }

    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  function sendSong(params: any) {
    params.preventDefault();
    setSongSubmitted(true);

    // IMPORTANT: grabs the typed in Song Title

    setSeen("visible");
  }

  async function search() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var returnedTracks = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.tracks.items);
      });

    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      });
  }

  const songSelect = async (props: any) => {
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth();
    // const day = date.getDate();
    // console.log(day + "/" + month + "/" + year);
    // setUsername(day + "/" + month + "/" + year);

    setSeenCard("hidden");

    let x = props.target;
    while (x.tagName !== "SECTION") {
      x = x.parentNode;
    }

    for (const child of x.childNodes) {
      let songTitle = child.childNodes.item(0).innerHTML;
      let artistOfSong = child.childNodes.item(1).innerHTML;
      let albumName = tracks[0]["album"]["name"];
      let songURI = tracks[0]["uri"];
      let imageURL = tracks[0]["album"]["images"][1]["url"];
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      let todayDate = month + "/" + day + "/" + year;

      // IMPORTANT: grabs the selected Song Title and Artist
      setSongTitle(songTitle);
      setArtistOfSong(artistOfSong);
      setAlbumName(tracks[0]["album"]["name"]);
      setImageURL(tracks[0]["album"]["images"][1]["url"]);
      setSeen("hidden");
      setSeenCard("visible");
      // setURI(tracks[0]["uri"]);

      // writeJSON();
      await axios.post("http://localhost:8888/addSong", {
        username: todayDate,
        album: albumName,
        song: songTitle,
        artist: artistOfSong,
        url: imageURL,
        uri: songURI,
      });
    }
  };
  return (
    <div>
      <div className="h-max">
        <br />
        <h1 className="text-black text-6xl md:text-8xl font-bold text-center ml-20 mr-20 tracking-tight">
          What are you{" "}
          <span className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow via-turquoise to-pink">
            listening
          </span>{" "}
          to?
        </h1>
        <div
          className={`${seeWelcome} flex justify-center mt-20 mb-10 text-4xl text-gray-700`}
        >
          Get started by logging in with Spotify!
        </div>
        <div className="flex justify-center text-4xl text-gray-700">
          <a
            id="login-button"
            href={loginUrl}
            className={`${seeWelcome} transition-all duration-500 text-center text-lg px-16 py-4 rounded-full text-turquoise bg-white border-turquoise border-2 hover:text-white hover:bg-turquoise mt-4 mr-2 lg:mr-3 xl:mr-12 lg:mt-0`}
          >
            Log In
          </a>
        </div>
        <div className={`${seeSearch} flex justify-center`}>
          <div
            className="flex w-1/2 flex-col my-20"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <form
              className="relative flex flex-col md:flex-row items-center gap-3"
              onSubmit={sendSong}
            >
              <input
                type="text"
                placeholder="Song Title..."
                aria-label="Your song"
                name="text"
                id="song-title"
                onChange={(event) => setSearchInput(event.target.value)}
                value={searchInput}
                required
                className="rounded-full w-full h-[4rem] text-gray-800 placeholder-gray-400 bg-gray-100 border p-4"
              />
              <button
                type="submit"
                className="lg:text-xl h-[4rem] rounded-full transition-all duration-500 text-turquoise bg-white border-turquoise border-2 hover:text-white hover:bg-turquoise md:px-2 py-4 w-full md:w-1/5"
                onClick={(event) => {
                  search();
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div
          id="songs"
          className={`${seen} flex flex-col flex-wrap justify-center mx-[3rem] sm:mx-[14rem] xl:mx-[35rem] gap-2`}
        >
          {tracks.map((track, i) => {
            return (
              <section
                onClick={songSelect}
                className="transition duration-500 ease-in"
              >
                <Song
                  title={track["name"]}
                  artist={track["artists"][0]["name"]}
                />
              </section>
            );
          })}
        </div>
        <div className={`${seenCard}`}>
          <p className="text-center font-semibold tracking-tight text-xl mx-20 md:text-2xl md:mx-64">
            <span
              id="songTitle-id"
              className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink via-yellow to-turquoise"
            >
              {songTitle}
            </span>{" "}
            by{" "}
            <span
              id="artistOfSong-id"
              className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-pink to-yellow"
            >
              {artistOfSong}
            </span>{" "}
            has been added to your{" "}
            <Link
              id="nav-feed"
              to="/feed"
              className="text-turquoise animate-pulse duration-300"
            >
              feed
            </Link>
            !
          </p>
          <div className="flex justify-center drop-shadow-xl mt-10 hover:drop-shadow-2xl">
            <img
              className="transition duration-300 hover:scale-110 rounded-lg"
              src={imageURL}
              alt="Album"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="hidden">
        <Feed />
      </div>
    </div>
  );
}

export default SearchBar;
