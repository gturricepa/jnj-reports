// PreventableBarChartByRegion.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { PreventableData } from "../../../types/Preventable";
import { redPalete } from "../../../styles/theme";
import { ChartTitle } from "../../../components/chartitle";
import * as S from "./styles";
interface PreventableBarChartByRegionProps {
  data: PreventableData[];
  year: number;
}

export const PreventableBarChartByRegion: React.FC<
  PreventableBarChartByRegionProps
> = ({ data, year }) => {
  const groupedData = data.reduce((acc, item) => {
    const region = item.Region;
    if (!acc[region]) {
      acc[region] = {
        No: 0,
        "No Data": 0,
        Yes: 0,
      };
    }

    acc[region].No += Number(item.No);
    acc[region]["No Data"] += Number(item["No Data"]);
    acc[region].Yes += Number(item.Yes);

    return acc;
  }, {} as Record<string, { No: number; "No Data": number; Yes: number }>);

  const chartData = Object.entries(groupedData).map(([region, values]) => ({
    name: region,
    Yes: values.Yes,
    No: values.No,
    "No Data": values["No Data"],
  }));

  const formatValue = (value: number) => value.toFixed(0);

  return (
    <S.ChartHolder>
      <ChartTitle value={year.toString()} />
      <BarChart width={500} height={200} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => formatValue(Number(value))} />
        <Legend />

        <Bar dataKey="Yes" fill={redPalete[0]} />
        <Bar dataKey="No" fill={redPalete[1]} />
        <Bar dataKey="No Data" fill={redPalete[2]} />
      </BarChart>
    </S.ChartHolder>
  );
};
