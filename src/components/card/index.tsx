import { ReactNode } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface CardProps {
  icon?: ReactNode;
  total: number | string;
  text: string;
  helper?: string;
}

export const Card: React.FC<CardProps> = ({ total, text, icon, helper }) => {
  const { t } = useTranslation();
  return (
    <S.Holder>
      {/* <S.Header> */}
      <S.Icon>{icon}</S.Icon>
      {/* </S.Header> */}
      <S.Main>
        {total}
        {helper}
      </S.Main>
      <S.Text>{t(text)}</S.Text>
    </S.Holder>
  );
};
