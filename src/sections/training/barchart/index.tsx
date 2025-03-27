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
import { ChartTitle } from "../../../components/chartitle";

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
  data,
  trainingCompleteCount,
  pendingCount,
  noTrainingCount,
}) => {
  const cData = [
    {
      "Training Completed": trainingCompleteCount,
      Pending: pendingCount,
      "No training": noTrainingCount,
    },
  ];

  // console.log(trainingCompleteCount, pendingCount, noTrainingCount);
  console.log("data", data);
  console.log("cData", cData);

  const formatValue = (value: number) => value.toFixed(0);

  return (
    <S.ChartHolder>
      <ChartTitle value="Trainnig Statistics" />
      <ResponsiveContainer width={700} height={250}>
        <BarChart data={cData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatValue(Number(value))} />
          <Legend />
          <Bar dataKey="Training Completed" fill={redPalete[0]} />
          <Bar dataKey="Pending" fill={redPalete[1]} />
          <Bar dataKey="No training" fill={redPalete[2]} />
        </BarChart>
      </ResponsiveContainer>
    </S.ChartHolder>
  );
};
