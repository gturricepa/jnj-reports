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
import { chartPalete } from "../../../styles/theme";
import { ChartTitle } from "../../../components/chartitle";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface PreventableBarChartByRegionProps {
  data: PreventableData[];
  year: number;
}

export const PreventableBarChartByRegion: React.FC<
  PreventableBarChartByRegionProps
> = ({ data, year }) => {
  const { t } = useTranslation();

  const groupedData = data.reduce((acc, item) => {
    const region = item.Region;
    if (!acc[region]) {
      acc[region] = {
        [t("no")]: 0,
        [t("noData")]: 0,
        [t("yes")]: 0,
      };
    }

    acc[region][t("no")] += Number(item.No) || 0;
    acc[region][t("noData")] += Number(item["No Data"]) || 0;
    acc[region][t("yes")] += Number(item.Yes) || 0;

    return acc;
  }, {} as Record<string, { [key: string]: number }>);

  const chartData = Object.entries(groupedData).map(([region, values]) => ({
    name: region,
    [t("yes")]: values[t("yes")],
    [t("no")]: values[t("no")],
    [t("noData")]: values[t("noData")],
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

        <Bar dataKey={t("yes")} fill={chartPalete[0]} />
        <Bar dataKey={t("no")} fill={chartPalete[1]} />
        <Bar dataKey={t("noData")} fill={chartPalete[2]} />
      </BarChart>
    </S.ChartHolder>
  );
};
