import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ name }: { name: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="snap-y snap-center h-screen flex justify-center items-center relative">
      <div ref={ref} className="w-80 h-96 relative ">
        <img
          className="absolute inset-0 w-full h-full m-5 overflow-hidden"
          src={`/${name}.jpg`}
          alt="A London skyscraper"
        />
      </div>
      <motion.h2
        className="text-pink m-0 left-1/2 ml-24 text-6xl font-bold tracking-tight leading-tight absolute"
        style={{ y }}
      >{`@${name}`}</motion.h2>
    </section>
  );
}

function Friends() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="">
      <>
        {["frank", "ivnnn", "teresa", "tzu", "viv"].map((image) => (
          <Image name={image} />
        ))}
        <motion.div
          className="snap-y fixed inset-x-0 h-1.5 bottom 24"
          style={{ scaleX }}
        />
      </>
    </div>
  );
}

export default Friends;
