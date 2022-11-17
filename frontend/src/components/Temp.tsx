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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll">
      {["frank", "ivnnn", "teresa", "tzu", "viv"].map((image) => (
        <Image name={image} />
      ))}

      <motion.div
        className="fixed inset-x-0 h-1.5 bg-pink bottom-24"
        style={{ scaleX }}
      />
    </div>
  );
}
