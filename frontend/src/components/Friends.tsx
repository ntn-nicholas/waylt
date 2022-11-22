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
    <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll -mt-32">
      {["frank", "ivnnn", "teresa", "tzu", "viv"].map((image) => (
        <Image name={image} />
      ))}
    </div>
  );
}
