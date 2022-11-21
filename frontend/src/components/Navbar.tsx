import React from "react";
import { loginUrl } from '../backend/login';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-beige p-6 mb-20 h-30">
      <div className="flex-grow flex items-center w-auto ">
        <div className="flex-grow">
          <a
            href="#responsive-header"
            className="inline-block mt-4 lg:inline-block lg:mt-0 text-pink text-5xl font-extrabold ml-4 lg:ml-10 xl:ml-52"
          >
            w<span className="text-turquoise">a</span>
            <span className="text-yellow ">y</span>lt
          </a>
        </div>
        <div>
          <a
            href="#responsive-header"
            className="hidden lg:visible mt-4 lg:inline-block lg:mt-0 text-pink text-2xl hover:text-turquoise lg:mr-4"
          >
            Activity
          </a>
          <a
            href="#responsive-header"
            className="hidden lg:visible mt-4 lg:inline-block lg:mt-0 text-pink text-2xl hover:text-turquoise lg:mr-16 lg:ml-12"
          >
            Friends
          </a>
          <a
            href={loginUrl}
            className="transition-all duration-500 text-center inline-block text-lg px-16 py-4 rounded-full text-beige bg-turquoise border-turquoise border-2 hover:text-turquoise hover:bg-beige mt-4 mr-4 lg:mr-10 xl:mr-52 lg:mt-0"
          >
            Log in
          </a>
        </div>
      </div>
    </nav>
  );
}
