// PreventableBarChart.tsx
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

export const PreventableBarChart: React.FC<PreventableBarChartProps> = ({
  data,
  year,
}) => {
  const totals = data.reduce(
    (acc, item) => {
      acc.totalMiles += Number(item["Miles"]);

      if (Number(item["Yes"]) !== 0) {
        acc["Yes"] += Number(item["Yes"]);
      }

      if (Number(item["No"]) !== 0) {
        acc["No"] += Number(item["No"]);
      }

      if (Number(item["No Data"]) !== 0) {
        acc["No Data"] += Number(item["No Data"]);
      }

      return acc;
    },
    { totalMiles: 0, Yes: 0, No: 0, "No Data": 0 }
  );

  const proportion = totals.totalMiles > 0 ? 1000000 / totals.totalMiles : 0;

  // Calculando os valores finais
  const preventableValue = totals["Yes"] * proportion;
  const notPreventableValue = totals["No"] * proportion;
  const noDataValue = totals["No Data"] * proportion;

  const chartData = [
    {
      name: "Total",
      "CPMM Preventable": preventableValue,
      "CPMM Not Preventable": notPreventableValue,
      "CPMM No Data": noDataValue,
    },
  ];

  const filteredData = {
    name: chartData[0].name,
    ...Object.fromEntries(
      Object.entries(chartData[0]).filter(
        ([key, value]) => key === "name" || Number(value) > 0
      )
    ),
  };

  const legendKeys = Object.keys(filteredData).filter((key) => key !== "name");

  const formatValue = (value: number) => value.toFixed(2);

  return (
    <S.ChartHolder>
      <ChartTitle value={year.toString()} />
      <BarChart width={500} height={250} data={[filteredData]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => formatValue(Number(value))} />
        <Legend>
          {legendKeys.map((key, index) => (
            <span key={index} style={{ color: redPalete[index] }}>
              {key}
            </span>
          ))}
        </Legend>
        {legendKeys.includes("CPMM Preventable") && (
          <Bar dataKey="CPMM Preventable" fill={redPalete[0]} />
        )}
        {legendKeys.includes("CPMM Not Preventable") && (
          <Bar dataKey="CPMM Not Preventable" fill={redPalete[1]} />
        )}
        {legendKeys.includes("CPMM No Data") && (
          <Bar dataKey="CPMM No Data" fill={redPalete[2]} />
        )}
      </BarChart>
    </S.ChartHolder>
  );
};
