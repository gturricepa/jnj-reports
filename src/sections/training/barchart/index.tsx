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
import { redPalete } from "../../../styles/theme";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface TrainingSimpleBarChartProps {
  data: {
    name: string;
    "Training Completed": number;
    Pending: number;
    "No training": number;
  }[];
  trainingCompleteCount: number;
  pendingCount: number;
  noTrainingCount: number;
}

export const TrainingSimpleBarChart: React.FC<TrainingSimpleBarChartProps> = ({
  trainingCompleteCount,
  pendingCount,
  noTrainingCount,
}) => {
  const { t } = useTranslation();
  const cData = [
    {
      name: t("trainingStatistics"),
      "Training Completed": trainingCompleteCount,
      Pending: pendingCount,
      "No training": noTrainingCount,
    },
  ];

  const formatValue = (value: number) => value.toFixed(0);

  return (
    <S.ChartHolder>
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
            dataKey="Training Completed"
            fill={redPalete[0]}
            name={t("trainingCompleted")}
          />
          <Bar dataKey="Pending" fill={redPalete[1]} name={t("pending")} />
          <Bar
            dataKey="No training"
            fill={redPalete[2]}
            name={t("noTraining")}
          />
        </BarChart>
      </ResponsiveContainer>
    </S.ChartHolder>
  );
};
