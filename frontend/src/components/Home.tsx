import { MotionConfig } from "framer-motion";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const data01 = [
    {
      genre: "Pop",
      minutes: 400,
      fill: "#FF0000",
    },
    {
      genre: "Hip-Hop",
      minutes: 300,
      fill: "#FFFF00",
    },
    {
      genre: "Country",
      minutes: 300,
      fill: "#00FF00",
    },
    {
      genre: "Rock",
      minutes: 200,
      fill: "#9B26B6",
    },
    {
      genre: "Jazz",
      minutes: 278,
      fill: "#0000FF",
    },
    {
      genre: "Rap",
      minutes: 189,
      fill: "#FFA500",
    },
  ];

  const [minutes, setMinutes] = useState(0);
  const [genre, setGenre] = useState("");

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
      genre,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * -15;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    setMinutes(value);
    setGenre(genre);

    return (
      <g className="">
        <Sector
          className="hover:drop-shadow-2xl hover:animate-pulse"
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div>
      <div className="bg-beige h-max">
        <br />
        <br />
        <h1 className="text-pink text-6xl md:text-8xl font-bold text-center ml-20 mr-20">
          What are you{" "}
          <span className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-turquoise via-pink to-yellow">
            listening
          </span>{" "}
          to?
        </h1>
        <h1 className="text-pink text-center mt-20 text-3xl md:text-5xl tracking-tight ml-20 mr-20">
          You listened to{" "}
          <span className="font-bold text-yellow">{minutes}&nbsp;</span>
          minutes of <span className="font-bold text-yellow">{genre}</span>{" "}
          today!
        </h1>
        <div className="flex justify-center h-screen w-screen drop-shadow-2xl -mt-2 2xl:-mt-20">
          <ResponsiveContainer width="100%" height="70%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data01}
                dataKey="minutes"
                nameKey="genre"
                cx="50%"
                cy="50%"
                outerRadius="60%"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
