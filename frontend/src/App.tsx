import React, { useEffect } from "react";
import Feed from "./components/Feed";
import Activity from "./components/Activity";
import Log_in from "./components/Log_in";
import Playlist from "./components/Player";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";

export let token = null as any;

function App() {
  if (token === null && window.location.hash.length > 0) {
    const getTokenFromUrl = () => {
      let access_token = window.location.hash.substring(1);
      const pattern = "access_token=(.+)&token_type=.*";
      const match = access_token.match(pattern);
      if (match != null) return match[1];
    };
    token = getTokenFromUrl();
    axios
      .get("http://localhost:8888/")
      .then((response) => console.log(response))
      .catch((error) => {
        console.log("An error has occurred.");
      });
  }

  return (
    <div className="bg-white font-montserrat">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
