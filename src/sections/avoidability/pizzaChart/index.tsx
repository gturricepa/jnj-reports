// PreventablePizzaChart.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { PreventableData } from "../../../types/Preventable";
import { redPalete } from "../../../styles/theme";
import * as S from "./styles";
interface PreventablePizzaChartProps {
  data: PreventableData[];
  year: number;
}

export const PreventablePizzaChart: React.FC<PreventablePizzaChartProps> = ({
  data,
  year,
}) => {
  // Preparando os dados para o gráfico de pizza
  const chartData = [
    {
      name: "No",
      value: data.reduce((acc, item) => acc + Number(item.No), 0),
    },
    {
      name: "No Data",
      value: data.reduce((acc, item) => acc + Number(item["No Data"]), 0),
    },
    {
      name: "Yes",
      value: data.reduce((acc, item) => acc + Number(item.Yes), 0),
    },
  ].filter((item) => item.value > 0);
  return (
    <S.ChartHolder>
      <h3>{year}</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          innerRadius={65}
          dataKey="value"
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={redPalete[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </S.ChartHolder>
  );
};
