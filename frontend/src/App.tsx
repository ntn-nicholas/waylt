import React from "react";
import Friends from "./components/Friends";
import Activity from "./components/Activity";
import Log_in from "./components/Log_in";
import Playlist from "./components/Player";
import Navbar from "./components/Navbar";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export let token = null as any;

function App() {
    if (token === null && window.location.hash.length > 0) {
        const getTokenFromUrl = () => {
            return window.location.hash
                .substring(1)
                .split('&')
                .reduce((initial, item) => {
                    let parts = item.split("=");
                    Object.assign(initial, (parts[0], decodeURIComponent(parts[1])));
                    return initial;
                }, {});
        }
        token = getTokenFromUrl();
        console.log(token);
    }

    return (
        <div className="bg-white font-montserrat">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Activity />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/activity" element={<Activity />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
