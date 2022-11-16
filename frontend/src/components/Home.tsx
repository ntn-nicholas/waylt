import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

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
      genre: "Group A",
      minutes: 400,
      fill: "#FF0000",
    },
    {
      genre: "Group B",
      minutes: 300,
      fill: "#FFFF00",
    },
    {
      genre: "Group C",
      minutes: 300,
      fill: "#00FF00",
    },
    {
      genre: "Group D",
      minutes: 200,
      fill: "#9B26B6",
    },
    {
      genre: "Group E",
      minutes: 278,
      fill: "#0000FF",
    },
    {
      genre: "Group F",
      minutes: 189,
      fill: "#FFA500",
    },
  ];

  const [minutes, setMinutes] = useState(0);

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

    return (
      <g>
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
        {/* <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 20}
          fill={fill}
        /> */}
        {/* <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
        {/* <text
          className="text-xl md:text-4xl"
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#f28482"
        >{`${value}`}</text> */}
        {/* <text
          className="text-lg md:text-2xl"
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={30}
          textAnchor={textAnchor}
          fill="#f5cac3"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  };

  return (
    <div className="bg-beige h-max">
      <br />
      <br />
      <h1 className="text-pink text-5xl md:6xl font-semibold flex justify-center text-center">
        What are you listening to?
      </h1>
      <h1 className="flex justify-center mt-32 text-pink text-5xl drop-shadow-xl">
        {minutes} minutes
      </h1>
      <div className="flex justify-center h-screen w-screen drop-shadow-2xl">
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
  );
}

export default Home;
