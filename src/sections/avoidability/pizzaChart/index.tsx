import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { PreventableData } from "../../../types/Preventable";
import { redPalete } from "../../../styles/theme";
import * as S from "./styles";
import { ChartTitle } from "../../../components/chartitle";

interface PreventableBarChartProps {
  data: PreventableData[];
  year: number;
}

export const PreventableSimpleBarChart: React.FC<PreventableBarChartProps> = ({
  data,
  year,
}) => {
  const chartData = [
    {
      name: "Total",
      Yes: data.reduce((acc, item) => acc + Number(item.Yes), 0),
      No: data.reduce((acc, item) => acc + Number(item.No), 0),
      "No Data": data.reduce((acc, item) => acc + Number(item["No Data"]), 0),
    },
  ];

  const formatValue = (value: number) => value.toFixed(0);

  return (
    <S.ChartHolder>
      <ChartTitle value={year.toString()} />
      <ResponsiveContainer width={400} height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatValue(Number(value))} />
          <Legend />

          <Bar dataKey="Yes" fill={redPalete[0]} />
          <Bar dataKey="No" fill={redPalete[1]} />
          <Bar dataKey="No Data" fill={redPalete[2]} />
        </BarChart>
      </ResponsiveContainer>
    </S.ChartHolder>
  );
};
