// src/components/BarChartHrd.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { HRDData } from "../../../types/HRD";

interface BarChartHrdProps {
  data: HRDData[];
}

const BarChartHrd: React.FC<BarChartHrdProps> = ({ data }) => {
  const countryCount = data.reduce((acc, item) => {
    acc[item.Country] = (acc[item.Country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.keys(countryCount).map((country, index) => ({
    Country: country,
    count: countryCount[country],
    color: ["#ee1100", "#ff0000", "#ff3333", "#ff6666", "#ff9999", "#ffcccc"][
      index % 6
    ],
  }));

  return (
    <ResponsiveContainer width={400} height={200}>
      <BarChart data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Country" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count">
          {barChartData.map((entry) => (
            <Cell key={entry.Country} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartHrd;
