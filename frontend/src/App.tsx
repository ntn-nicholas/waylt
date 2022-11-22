import React from "react";
import Friends from "./components/Friends";
import Activity from "./components/Activity";
import Log_in from "./components/Log_in";
import Playlist from "./components/Player";
import Navbar from "./components/Navbar";
import "./App.css";
import Temp from "./components/Temp";
import {Routes, Route, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Activity />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
        <Activity />
        <Friends />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
