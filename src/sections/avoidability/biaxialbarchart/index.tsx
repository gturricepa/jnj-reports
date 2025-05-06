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
import { threePositionsChartPalete } from "../../../styles/theme";
import { ChartTitle } from "../../../components/chartitle";
import { useTranslation } from "react-i18next";

interface PreventableBarChartProps {
  data: PreventableData[];
  year: number;
}

export const GroupedBarChart: React.FC<PreventableBarChartProps> = ({
  data,
  year,
}) => {
  const { t } = useTranslation();

  const groupedData = data.reduce((acc, item) => {
    const region = item.Region;

    if (!acc[region]) {
      acc[region] = {
        totalMiles: 0,
        [t("yes")]: 0,
        [t("no")]: 0,
        [t("noData")]: 0,
      };
    }

    acc[region].totalMiles += Number(item["Miles"]);
    acc[region][t("yes")] += Number(item["Yes"]);
    acc[region][t("no")] += Number(item["No"]);
    acc[region][t("noData")] += Number(item["No Data"]);

    return acc;
  }, {} as Record<string, { totalMiles: number; [key: string]: number }>);

  const chartData = Object.entries(groupedData).map(([region, values]) => {
    const proportion = values.totalMiles > 0 ? 1000000 / values.totalMiles : 0;

    return {
      name: region,
      [t("cpmmPreventable")]: values[t("yes")] * proportion,
      [t("cpmmNotPreventable")]: values[t("no")] * proportion,
      [t("cpmmNoData")]: values[t("noData")] * proportion,
      totalMiles: values.totalMiles,
    };
  });

  const formatValue = (value: number) => value.toFixed(2);

  return (
    <S.ChartHolder>
      <ChartTitle value={year.toString()} />
      <BarChart width={500} height={200} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => formatValue(Number(value))} />
        <Legend />

        <Bar
          dataKey={t("cpmmPreventable")}
          fill={threePositionsChartPalete[0]}
        />
        <Bar
          dataKey={t("cpmmNotPreventable")}
          fill={threePositionsChartPalete[1]}
        />
        <Bar dataKey={t("cpmmNoData")} fill={threePositionsChartPalete[2]} />
      </BarChart>
    </S.ChartHolder>
  );
};
