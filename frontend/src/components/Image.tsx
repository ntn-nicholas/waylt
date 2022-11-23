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

function Image({ name }: { name: string }) {
  const ref = useRef(null);
  const [button, setButton] = useState("0");

  function playButton() {
    setButton("100");
  }

  function stopButton() {
    setButton("0");
  }

  return (
    <section className="snap-center h-screen flex justify-center items-center relative">
      <h1 className="text-pink sm:left-[57%] sm:visible sm:text-6xl font-bold tracking-tight leading-tight absolute z-40">{`@${name}`}</h1>
      <div
        ref={ref}
        className="w-[400px] h-[500px] relative m-5 overflow-hidden"
        onMouseOver={playButton}
        onMouseOut={stopButton}
      >
        <div
          className={`opacity-${button} hover:scale-105 transition duration-[350ms] left-[73%] bottom-[5%] sm:left-[73%] sm:bottom-[5%] absolute bg-pink rounded-full w-20 h-20 z-40`}
        >
          <FontAwesomeIcon
            className="text-black text-[2.5rem] z-50 absolute left-[35%] bottom-[25%]"
            icon={faPlay}
          />
        </div>
        <img
          className={`transition duration-[450ms] absolute inset-0 w-full h-full rounded-lg`}
          src={`/${name}.jpg`}
          alt="A London skyscraper"
        />
      </div>
    </section>
  );
}
export default Image;
