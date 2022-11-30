import React, { useState, useEffect } from "react";
import Song from "./Song";
import Image from "./Image";
import { loginUrl } from "../backend/login";

function SearchBar() {
  const [seeSearch, setSeeSearch] = useState("hidden");
  const [seeWelcome, setSeeWelcome] = useState("visible");

  useEffect(() => {
    const loggedIn = window.location.href !== "http://localhost:3000/";

    if (
      loggedIn ||
      document.getElementById("login-button")!.innerHTML === "Log Out"
    ) {
      document.getElementById("login-button")!.innerHTML = "Log Out";
      document.getElementById("nav-activity")!.innerHTML = "Activity";
      document.getElementById("nav-feed")!.innerHTML = "Feed";
      setSeeSearch("visible");
      setSeeWelcome("hidden");
    }
    console.log(document.getElementById("login-button")!.innerHTML);
  });

  const [searchInput, setSearchInput] = useState("");
  const [songSubmitted, setSongSubmitted] = useState(false);
  const [seen, setSeen] = useState("hidden");
  const [seenCard, setSeenCard] = useState("hidden");
  const [songList, setSongList] = useState<any>([]);

  const [songTitle, setSongTitle] = useState("");
  const [artistOfSong, setArtistOfSong] = useState("");

  function sendSong(params: any) {
    params.preventDefault();
    setSongSubmitted(true);

    // IMPORTANT: grabs the typed in Song Title

    console.log(searchInput);
    setSongList(tempList);
    setSeen("visible");
  }

  const songSelect = (props: any) => {
    setSeenCard("hidden");

    let x = props.target;
    while (x.tagName !== "SECTION") {
      x = x.parentNode;
    }

    for (const child of x.childNodes) {
      let songTitle = child.childNodes.item(0).innerHTML;
      let artistOfSong = child.childNodes.item(1).innerHTML;

      // IMPORTANT: grabs the selected Song Title and Artist

      console.log(songTitle);
      console.log(artistOfSong);
      setSongTitle(songTitle);
      setArtistOfSong(artistOfSong);
      setSeen("hidden");
      setSeenCard("visible");
    }
  };

  const tempList: any[] = [
    {
      title: "All I want for Christmas Is You",
      artist: "Mariah Carey",
    },
    {
      title: "Santa Tell Me",
      artist: "Ariana Grande",
    },
    {
      title: "Misteltoe",
      artist: "Justin Bieber",
    },
  ];

  const tempList_2: any[] = [
    {
      title: "All I want for Christmas Is You",
      artist: "Mariah Carey",
    },
    {
      title: "Santa Tell Me",
      artist: "Ariana Grande",
    },
    {
      title: "Misteltoe",
      artist: "Justin Bieber",
    },
    {
      title: "Snowman",
      artist: "Sia",
    },
    {
      title: "What Christmas Means To Me",
      artist: "98",
    },
    {
      title: "Holly Jolly Christmas",
      artist: "Michael Buble",
    },
  ];

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
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div
          id="songs"
          className={`${seen} flex flex-col flex-wrap justify-center mx-[3rem] sm:mx-[10rem] xl:mx-[30rem] gap-2`}
        >
          {songList.map((song: any) => (
            <section
              onClick={songSelect}
              className="transition duration-500 ease-in"
            >
              <Song title={song.title} artist={song.artist} />
            </section>
          ))}
        </div>
        <div className={`${seenCard}`}>
          <p className="text-center font-semibold tracking-tight text-xl mx-20 md:text-2xl md:mx-64">
            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink via-yellow to-turquoise">
              {songTitle}
            </span>{" "}
            by{" "}
            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-pink to-yellow">
              {artistOfSong}
            </span>{" "}
            has been added to your feed!
          </p>
          <button className="">Feed!</button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default SearchBar;
