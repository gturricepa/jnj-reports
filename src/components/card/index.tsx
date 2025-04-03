import { ReactNode } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface CardProps {
  icon?: ReactNode;
  total: number | string;
  text: string;
  helper?: string;
}

const formatNumberWithCommas = (number: number | string) => {
  return typeof number === "string"
    ? number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const Card: React.FC<CardProps> = ({ total, text, icon, helper }) => {
  const { t } = useTranslation();

  return (
    <S.Holder>
      <S.Icon>{icon}</S.Icon>
      <S.Main>
        {formatNumberWithCommas(total)}
        {helper}
      </S.Main>
      <S.Text>{t(text)}</S.Text>
    </S.Holder>
  );
};
