import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginUrl } from "../backend/login";

export default function Navbar() {
  const [seeLogin, setSeeLogin] = useState(false);
  useEffect(() => {
    const loggedIn = window.location.href !== "http://localhost:3000/";

    if (loggedIn) {
      setSeeLogin(true);
      document.getElementById("login-button")!.innerHTML = "Log Out";
      // document.getElementById("nav-activity")!.innerHTML = "";
      document.getElementById("nav-feed")!.innerHTML = "Feed";
    }
  });

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 mb-20 h-30 sticky top-0 z-50">
      <div className="flex-grow flex items-center w-auto lg:mx-22">
        <div className="flex-grow">
          <Link
            to="/"
            className="inline-block mt-4 lg:inline-block lg:mt-0 text-5xl font-extrabold ml-2 lg:ml-3 xl:ml-12 text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-pink to-yellow"
          >
            waylt
          </Link>{" "}
        </div>
        <div>
          <Link
            id="nav-activity"
            to="/activity"
            className="hidden lg:visible mt-4 lg:inline-block lg:mt-0 text-black text-2xl hover:text-turquoise lg:mr-4 transition duration-[450]"
          ></Link>
          <Link
            id="nav-feed"
            to="/feed"
            className="leading-5 tracking-tight	hidden lg:visible mt-4 lg:inline-block lg:mt-0 text-black text-xl hover:text-turquoise lg:mr-7 lg:ml-12 transition duration-[450]"
          ></Link>
          <a
            id="login-button"
            href={loginUrl}
            className={
              seeLogin
                ? `transition-all duration-500 text-center inline-block text-md px-16 py-4 rounded-full text-turquoise bg-white border-turquoise border-2 hover:text-white hover:bg-turquoise mt-4 mr-2 lg:mr-3 xl:mr-12 lg:mt-0`
                : `transition-all duration-500 text-center inline-block text-md px-16 py-4 rounded-full text-white bg-white border-white border-0 hover:text-white hover:bg-white mt-4 mr-2 lg:mr-3 xl:mr-12 lg:mt-0`
            }
          >
            Log In
          </a>
        </div>
      </div>
    </nav>
  );
}
