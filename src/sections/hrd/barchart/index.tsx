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
import { chartPalete } from "../../../styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

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
    color: chartPalete[index % chartPalete.length],
  }));
  const user = useSelector((state: RootState) => state.user);

  const setSize = (value: string | string[]): number => {
    if (typeof value === "string") {
      return 600;
    }

    const length = value.length;
    if (length === 1) {
      return 600;
    }
    if (length > 1 && length < 3) {
      return 800;
    }

    return 1000;
  };
  return (
    <ResponsiveContainer width={setSize(user.selectedCountry!)} height={200}>
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
