import React from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface ChartTitleProps {
  value: string;
}

export const ChartTitle: React.FC<ChartTitleProps> = ({ value }) => {
  const { t } = useTranslation();

  return <S.Holder>{t(value)}</S.Holder>;
};
