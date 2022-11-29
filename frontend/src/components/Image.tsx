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

function Image({
  username,
  album,
  song,
  artist,
}: {
  username: string;
  album: string;
  song: string;
  artist: string;
}) {
  const ref = useRef(null);
  const [button, setButton] = useState("opacity-0");
  const [bgOpacity, setBgOpacity] = useState("hover:opacity-80");

  function playButton() {
    setButton("opacity-100");
  }

  function stopButton() {
    setButton("opacity-0");
  }

  function playBgOpacity() {
    setBgOpacity("hover:opacity-80");
  }

  return (
    <section className="snap-center h-screen flex justify-center items-center relative">
      <h1 className="text-center sm:text-left bottom-[7rem] text-3xl text-pink drop-shadow-lg sm:left-[57%] sm:bottom-[22rem] 2xl:left-[57%] 2xl:bottom-[32rem] sm:visible sm:text-6xl font-bold tracking-tight leading-tight absolute z-40">{`@${username}`}</h1>
      <h2 className="text-center sm:text-left bottom-[48rem] text-5xl text-pink drop-shadow-lg sm:left-[18%] sm:bottom-[33rem] 2xl:left-[25%] 2xl:bottom-[40rem] sm:visible sm:text-5xl font-bold tracking-tight leading-tight absolute z-40">{`${album}`}</h2>
      <h2 className="text-center sm:text-left bottom-[45rem] text-4xl text-pink drop-shadow-lg sm:left-[18%] sm:bottom-[30rem] 2xl:left-[25%] 2xl:bottom-[37rem] sm:visible sm:text-4xl font-bold tracking-tight leading-tight absolute z-40">{`${song}`}</h2>
      <h2 className="text-center sm:text-left bottom-[42rem] text-3xl text-lightPink drop-shadow-lg sm:left-[18%] sm:bottom-[27rem] 2xl:left-[25%] 2xl:bottom-[34rem] sm:visible sm:text-3xl font-bold tracking-tight leading-tight absolute z-40">{`${artist}`}</h2>
      <div
        ref={ref}
        className={`${bgOpacity} w-[400px] h-[500px] relative m-5 overflow-hidden`}
        onMouseOver={playButton}
        onMouseOut={stopButton}
      >
        <div
          className={`transition duration-[350ms] ${button} hover:scale-105 left-[73%] bottom-[5%] sm:left-[73%] sm:bottom-[5%] absolute bg-pink drop-shadow-lg rounded-full w-20 h-20 z-40`}
          onMouseOver={playBgOpacity}
        >
          <FontAwesomeIcon
            className="text-black text-[2.5rem] z-50 absolute left-[35%] bottom-[25%]"
            icon={faPlay}
          />
        </div>
        <img
          className={`transition duration-[450ms] absolute inset-0 w-full h-full rounded-lg`}
          src={`/${username}.jpg`}
          alt="A London skyscraper"
        />
      </div>
    </section>
  );
}
export default Image;
