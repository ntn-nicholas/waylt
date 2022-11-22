import React from "react";
// import { loginUrl } from '../backend/login';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 mb-20 h-30">
      <div className="flex-grow flex items-center w-auto ">
        <div className="flex-grow">
          <a
            href="#responsive-header"
            className="inline-block mt-4 lg:inline-block lg:mt-0 text-5xl font-extrabold ml-4 lg:ml-10 xl:ml-52 text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-pink to-yellow"
          >
            waylt
          </a>
        </div>
        <div>
          <a
            href="#responsive-header"
            className="hidden lg:visible mt-4 lg:inline-block lg:mt-0 text-black text-2xl hover:text-turquoise lg:mr-4 transition duration-[450]"
          >
            Activity
          </a>
          <a
            href="#responsive-header"
            className="hidden lg:visible mt-4 lg:inline-block lg:mt-0 text-black text-2xl hover:text-turquoise lg:mr-16 lg:ml-12 transition duration-[450]"
          >
            Friends
          </a>
          <a
            // href={loginUrl}
            href="#responsive-header"
            className="transition-all duration-500 text-center inline-block text-lg px-16 py-4 rounded-full text-turquoise bg-white border-turquoise border-2 hover:text-white hover:bg-turquoise mt-4 mr-4 lg:mr-10 xl:mr-52 lg:mt-0"
          >
            Log in
          </a>
        </div>
      </div>
    </nav>
  );
}
