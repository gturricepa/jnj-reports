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
import { threePositionsChartPalete } from "../../../styles/theme";
import * as S from "./styles";
import { ChartTitle } from "../../../components/chartitle";
import { useTranslation } from "react-i18next";

interface PreventableBarChartProps {
  data: PreventableData[];
  year: number;
}

export const PreventableSimpleBarChart: React.FC<PreventableBarChartProps> = ({
  data,
  year,
}) => {
  const { t } = useTranslation();

  const chartData = [
    {
      name: "Total",
      [t("yes")]: data.reduce((acc, item) => acc + Number(item.Yes), 0),
      [t("no")]: data.reduce((acc, item) => acc + Number(item.No), 0),
      [t("noData")]: data.reduce(
        (acc, item) => acc + Number(item["No Data"]),
        0
      ),
    },
  ];

  const formatValue = (value: number) => value.toFixed(0);

  return (
    <S.ChartHolder>
      <ChartTitle value={year.toString()} />
      <ResponsiveContainer width={500} height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatValue(Number(value))} />
          <Legend />

          <Bar dataKey={t("yes")} fill={threePositionsChartPalete[0]} />
          <Bar dataKey={t("no")} fill={threePositionsChartPalete[1]} />
          <Bar dataKey={t("noData")} fill={threePositionsChartPalete[2]} />
        </BarChart>
      </ResponsiveContainer>
    </S.ChartHolder>
  );
};
