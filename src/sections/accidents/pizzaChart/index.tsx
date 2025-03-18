import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AccidentData } from "../../../types/Accident";

interface AvoidableChartProps {
  data: AccidentData[];
  title: string;
}

const AvoidableChart: React.FC<AvoidableChartProps> = ({ data, title }) => {
  const avoidableData = data.reduce((acc, curr) => {
    const key = curr.Avoidable.trim() || "No data";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(avoidableData).map(([key, value]) => ({
    name: key,
    value,
  }));

  const COLORS = [
    "#ee1100",
    "#ff0000",
    "#ff3333",
    "#ff6666",
    "#ff9999",
    "#ffcccc",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        height: "13rem",
        justifySelf: "center",
      }}
    >
      <PieChart width={410} height={350}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={90}
          innerRadius={75}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>{" "}
      {chartData.length > 0 ? <p>{title}</p> : <></>}
    </div>
  );
};

export default AvoidableChart;
