import React from "react";
import * as S from "./styles";

interface ChartTitleProps {
  value: string;
}

export const ChartTitle: React.FC<ChartTitleProps> = ({ value }) => {
  return <S.Holder>{value}</S.Holder>;
};
