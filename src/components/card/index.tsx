import { ReactNode } from "react";
import * as S from "./styles";

interface CardProps {
  icon?: ReactNode;
  total: number | string;
  text: string;
  helper?: string;
}

export const Card: React.FC<CardProps> = ({ total, text, icon, helper }) => {
  return (
    <S.Holder>
      {/* <S.Header> */}
      <S.Icon>{icon}</S.Icon>
      {/* </S.Header> */}
      <S.Main>
        {total}
        {helper}
      </S.Main>
      <S.Text>{text}</S.Text>
    </S.Holder>
  );
};
