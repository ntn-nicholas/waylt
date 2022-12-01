import React, { useEffect } from "react";
import Feed from "./components/Feed";
import Activity from "./components/Activity";
import Log_in from "./components/Log_in";
import Playlist from "./components/Player";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export let token = null as any;

function App() {
  if (token === null && window.location.hash.length > 0) {
    const getTokenFromUrl = () => {
      return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
          let parts = item.split("=");
          Object.assign(initial, (parts[0], decodeURIComponent(parts[1])));
          return initial;
        }, {});
    };
    token = getTokenFromUrl();
    console.log(token);
  }

  let userName = "";
  let albumName = "";
  let songTitle = "";
  let artistOfSong = "";

  return (
    <div className="bg-white font-montserrat">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route
            path="/feed"
            element={
              <Feed
                username={userName}
                album={albumName}
                song={songTitle}
                artist={artistOfSong}
              />
            }
          />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
