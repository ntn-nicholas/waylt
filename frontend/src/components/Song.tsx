import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function Song({ title, artist }: { title: string; artist: string }) {
  return (
    <div className="rounded-lg bg-gray-700 transition duration-300 hover:drop-shadow-2xl drop-shadow-lg hover:scale-105 text-center text-2xl p-4 drop">
      <div className="text-white text-2xl">{`${title}`}</div>
      <div className="text-xl text-gray-500">{`${artist}`}</div>
    </div>
  );
}
export default Song;
