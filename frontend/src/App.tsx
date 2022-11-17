import React from "react";
import Friends from "./components/Friends";
import Home from "./components/Home";
import Log_in from "./components/Log_in";
import Playlist from "./components/Player";
import Navbar from "./components/Navbar";
import "./App.css";
import Temp from "./components/Temp";

function App() {
  return (
    <div className="bg-beige">
      <Navbar />
      <Home />
      <Friends />
    </div>
  );
}

export default App;
