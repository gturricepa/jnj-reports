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
import * as S from "./styles";
import { PreventableData } from "../../../types/Preventable";
import { redPalete } from "../../../styles/theme";
import { ChartTitle } from "../../../components/chartitle";

interface PreventableBarChartProps {
  data: PreventableData[];
  year: number;
}

export const GroupedBarChart: React.FC<PreventableBarChartProps> = ({
  data,
  year,
}) => {
  const groupedData = data.reduce((acc, item) => {
    const region = item.Region;

    if (!acc[region]) {
      acc[region] = {
        totalMiles: 0,
        Yes: 0,
        No: 0,
        "No Data": 0,
      };
    }

    acc[region].totalMiles += Number(item["Miles"]);
    acc[region].Yes += Number(item["Yes"]);
    acc[region].No += Number(item["No"]);
    acc[region]["No Data"] += Number(item["No Data"]);

    return acc;
  }, {} as Record<string, { totalMiles: number; Yes: number; No: number; "No Data": number }>);

  const chartData = Object.entries(groupedData).map(([region, values]) => {
    const proportion = values.totalMiles > 0 ? 1000000 / values.totalMiles : 0;

    return {
      name: region,
      "CPMM Preventable": values.Yes * proportion,
      "CPMM Not Preventable": values.No * proportion,
      "CPMM No Data": values["No Data"] * proportion,
      totalMiles: values.totalMiles,
    };
  });

  const formatValue = (value: number) => value.toFixed(2);

  return (
    <S.ChartHolder>
      <ChartTitle value={year.toString()} />
      <BarChart width={400} height={200} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => formatValue(Number(value))} />
        <Legend />

        <Bar dataKey="CPMM Preventable" fill={redPalete[0]} />
        <Bar dataKey="CPMM Not Preventable" fill={redPalete[1]} />
        <Bar dataKey="CPMM No Data" fill={redPalete[2]} />
      </BarChart>
    </S.ChartHolder>
  );
};
