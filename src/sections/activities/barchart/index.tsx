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
import { threePositionsChartPalete } from "../../../styles/theme";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { NoData } from "../../../components/nodata";

interface ActivitiesSimpleBarChartProps {
  data: {
    name: string;
    Completed: number;
    Pending: number;
  }[];
  trainingCompleteCount: number;
  pendingCount: number;
}

export const ActivitiesSimpleBarChart: React.FC<
  ActivitiesSimpleBarChartProps
> = ({ trainingCompleteCount, pendingCount }) => {
  const { t } = useTranslation();

  const hasData = trainingCompleteCount > 0 || pendingCount > 0;

  const cData = hasData
    ? [
        {
          name: t("Status"),
          Completed: trainingCompleteCount,
          Pending: pendingCount,
        },
      ]
    : [];

  const formatValue = (value: number) => value.toFixed(0);

  return (
    <S.ChartHolder>
      {hasData ? (
        <ResponsiveContainer width={700} height={250}>
          <BarChart data={cData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatValue(value),
                t(name),
              ]}
            />
            <Legend formatter={(value) => t(value as string)} />
            <Bar
              dataKey="Completed"
              fill={threePositionsChartPalete[0]}
              name={t("Completed")}
            />
            <Bar
              dataKey="Pending"
              fill={threePositionsChartPalete[1]}
              name={t("Pending")}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            justifySelf: "center",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <NoData />
        </div>
      )}
    </S.ChartHolder>
  );
};
