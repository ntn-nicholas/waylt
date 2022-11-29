import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image from "./Image";

export default function Temp() {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll sm:-mt-32">
      {[
        {
          username: "frank",
          album: "Un Verano Sin Ti",
          song: "Moscow Mule",
          artist: "Bad Bunny",
        },
        {
          username: "ivnnn",
          album: "Mr. Morale & the Big Steppers",
          song: "United in Grief",
          artist: "Kendrick Lamar",
        },
        {
          username: "teresa",
          album: "Midnights",
          song: "Lavendar Haze",
          artist: "Taylor Swift",
        },
        {
          username: "tzu",
          album: "Harry's House",
          song: "As it Was",
          artist: "Harry Styles",
        },
        {
          username: "viv",
          album: "I Never Die",
          song: "TOMBOY",
          artist: "(G)I-DLE",
        },
      ].map((data) => (
        <Image
          username={data.username}
          album={data.album}
          song={data.song}
          artist={data.artist}
        />
      ))}
    </div>
  );
}
