import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function Image({ name }: { name: string }) {
  const ref = useRef(null);

  return (
    <section className="snap-center h-screen flex justify-center items-center relative">
      <h1 className="text-pink sm:left-[57%] sm:visible sm:text-6xl font-bold tracking-tight leading-tight absolute z-50">{`@${name}`}</h1>
      <div
        ref={ref}
        className="w-80 h-96 relative max-h-96 m-5 overflow-hidden"
      >
        <img
          className="absolute inset-0 w-full h-full"
          src={`/${name}.jpg`}
          alt="A London skyscraper"
        />
      </div>
    </section>
  );
}
export default Image;
