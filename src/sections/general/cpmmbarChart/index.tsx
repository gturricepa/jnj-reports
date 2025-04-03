import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Line,
  ComposedChart,
} from "recharts";
import { MainData } from "../../../types/MainData";
import { redPalete } from "../../../styles/theme";
import * as S from "./styles";
import { ChartTitle } from "../../../components/chartitle";
import { useTranslation } from "react-i18next";
import { paleteColors } from "../../../styles/theme";
interface GroupedData {
  totalAccidents: number;
  totalMiles: number;
}

interface ChartData {
  name: string;
  CPMM: number;
  Goal: number;
}

export const CPMMBarChart: React.FC<{ data: MainData[] }> = ({ data }) => {
  const { t } = useTranslation();

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
      .map(([country, values]) => {
        const goal =
          data.find((item) => item.Country === country)?.Region === "NA"
            ? 4.74
            : 10.43;

        return {
          name: country,
          CPMM:
            values.totalMiles > 0
              ? (values.totalAccidents * 1000000) / values.totalMiles
              : 0,
          Goal: goal,
        };
      })
      .filter((item) => item.CPMM > 0);
  };

  const chartData = calculateCPMM(data);

  const organizeData = (data: ChartData[]) => {
    data.sort((a, b) => {
      if (a.name === "United States of America") return -1;
      if (b.name === "United States of America") return 1;

      if (a.name === "Canada") return -1;
      if (b.name === "Canada") return 1;

      return 0;
    });
  };

  organizeData(chartData);

  return (
    <S.Holder>
      <ChartTitle value={t("CPMMacumulatedValues")} />
      <ComposedChart width={600} height={250} data={chartData}>
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
        <Line
          type="monotone"
          dataKey="Goal"
          stroke={paleteColors[2]}
          strokeWidth={1}
          dot={false}
        />
      </ComposedChart>
    </S.Holder>
  );
};
