import React from "react";
import { Link } from "react-router-dom";
import { loginUrl } from '../backend/login';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-6 mb-20 h-30 sticky top-0 z-50">
            <div className="flex-grow flex items-center w-auto ">
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
                        to="/feed"
                        className="hidden lg:visible mt-4 lg:inline-block lg:mt-0 text-black text-2xl hover:text-turquoise lg:mr-16 lg:ml-12 transition duration-[450]"
                    >
                        Feed
                    </Link>
                    <a
                        href={loginUrl}
                        className="transition-all duration-500 text-center inline-block text-lg px-16 py-4 rounded-full text-turquoise bg-white border-turquoise border-2 hover:text-white hover:bg-turquoise mt-4 mr-2 lg:mr-3 xl:mr-12 lg:mt-0"
                    >
                        Log in
                    </a>
                </div>
            </div>
        </nav>
    );
}
