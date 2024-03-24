"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ComposedChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Area,
  Bar,
  Line,
} from "recharts";

const RevenueCharts = ({ course }) => {
  const rev = [
    { name: "ferry", value: 10000 },
    { name: "terry", value: 20000 },
    { name: "derry", value: 40000 },
  ];
  const revenue = [
    { name: "ferry", uv: 10000, pv: 1000, amt: 400 },
    { name: "terry", uv: 20000, pv: 500, amt: 500 },
    { name: "derry", uv: 40000, pv: 3900, amt: 300 },
  ];
  const populate = [
    { name: "ferry", value: 20 },
    { name: "terry", value: 50 },
    { name: "derry", value: 80 },
  ];
  return (
    <div className=" flex justify-center items-center flex-row max-w-minnelayer rounded-lg bg-whiteGraded p-responsive2 min-h-fit relative ">
      <div className=" relative flex justify-center flex-col gap-y-5 top-1 rounded-lg p-responsive4 bg-greenGradedHov">
        <h2 className="  text-greenGraded1 p-1 bg-whiteOpaque font-bold text-1xl">
          courseCharts
        </h2>
        <PieChart width={430} height={400}>
          <Pie
            className=" relative top-7"
            data={populate}
            dataKey="value"
            nameKey="name"
            cx={190}
            cy={190}
            outerRadius={90}
            fill="#034e19b3"
          />
          <Pie
            data={rev}
            dataKey="value"
            nameKey="name"
            cx={190}
            cy={190}
            innerRadius={100}
            outerRadius={160}
            fill="#067c24"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
      <div className=" relative left-8 rounded-lg p-responsive4  bg-white text-1xl border-width1px border-grey">
        <h2 className=" bg-white font-bold ">RevenueCharts</h2>
        <ComposedChart
          width={830}
          height={350}
          data={revenue}
          className=" relative top-1 "
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#82bfe2" />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={10} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </div>
  );
};

export default RevenueCharts;
