import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  //   Legend,
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

const calculateCPMM = (data: MainData[]): ChartData[] => {
  const groupedData: Record<string, GroupedData> = {};

  data.forEach((item) => {
    const country = item.Country;
    const accidents = parseInt(item["Accident Count"], 10);
    const miles = parseInt(item.Miles, 10);

    if (!groupedData[country]) {
      groupedData[country] = { totalAccidents: 0, totalMiles: 0 };
    }

    groupedData[country].totalAccidents += accidents;
    groupedData[country].totalMiles += miles;
  });

  return Object.entries(groupedData)
    .map(([country, values]) => ({
      name: country,
      CPMM:
        values.totalMiles > 0
          ? (values.totalAccidents * 1000000) / values.totalMiles
          : 0,
    }))
    .filter((item) => item.CPMM > 0);
};

export const CPMMBarChart: React.FC<{ data: MainData[] }> = ({ data }) => {
  const chartData = calculateCPMM(data);

  //   if (data.length >= 0) return <></>;

  return (
    <S.Holder>
      <ChartTitle value="CPMM Acumulated Values" />
      <BarChart width={500} height={250} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => value.toFixed(2)} />
        {/* <Legend /> */}
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
