import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { MainData } from "../../../types/MainData";
import { redPalete } from "../../../styles/theme";
import * as S from "./styles";
import { ChartTitle } from "../../../components/chartitle";

interface GroupedData {
  totalAccidents: number;
  totalMiles: number;
}

interface ChartData {
  name: string;
  CPMM: number;
}

const calculateCPMMByRegion = (data: MainData[]): ChartData[] => {
  const groupedData: Record<string, GroupedData> = {};

  data.forEach((item) => {
    const region = item.Region;
    const accidents = parseInt(item["Accident Count"], 10);
    const miles = parseInt(item.Miles, 10);

    if (!groupedData[region]) {
      groupedData[region] = { totalAccidents: 0, totalMiles: 0 };
    }

    groupedData[region].totalAccidents += accidents;
    groupedData[region].totalMiles += miles;
  });

  return Object.entries(groupedData)
    .map(([region, values]) => ({
      name: region,
      CPMM:
        values.totalMiles > 0
          ? (values.totalAccidents * 1000000) / values.totalMiles
          : 0,
    }))
    .filter((item) => item.CPMM > 0); // Filtra regiões com CPMM > 0
};

export const CPMMBarChartByRegion: React.FC<{ data: MainData[] }> = ({
  data,
}) => {
  const chartData = calculateCPMMByRegion(data);

  return (
    <S.Holder>
      <ChartTitle value="CPMM Accumulated Values by Regions" />
      <BarChart width={400} height={200} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => value.toFixed(2)} />
        <Bar dataKey="CPMM">
          {chartData.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={redPalete[index % redPalete.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </S.Holder>
  );
};
