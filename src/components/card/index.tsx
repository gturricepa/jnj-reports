import { ReactNode } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface CardProps {
  icon?: ReactNode;
  total: number | string;
  text: string;
  helper?: string;
  color?: boolean;
  region?: string; // Ainda mantendo como string
  type?: "CPMM" | "IPMM"; // Adicionando o type para CPMM ou IPMM
}

const formatNumberWithCommas = (number: number | string) => {
  return typeof number === "string"
    ? number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const Card: React.FC<CardProps> = ({
  total,
  text,
  icon,
  helper,
  color,
  region,
  type = "CPMM",
}) => {
  const { t } = useTranslation();

  const validRegion: "NA" | "LATAM" | undefined =
    region === "NA" || region === "LATAM" ? region : undefined;

  if (!color || !validRegion) {
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
  }

  const parsedTotal = typeof total === "string" ? parseFloat(total) : total;

  const BASES = {
    CPMM: {
      NA: 4.73,
      LATAM: 10.74,
    },
    IPMM: {
      NA: 0.09,
      LATAM: 0.08,
    },
  };

  const base = BASES[type]?.[validRegion] ?? 0;

  const isGood = parsedTotal <= base;

  const borderColor = isGood ? "#2e7d32" : "#c62828"; // verde ou vermelho escuro
  const backgroundColor = isGood ? "#e8f5e9" : "#fdecea"; // verde claro ou vermelho claro
  const textColor = isGood ? "#2e7d32" : "#c62828"; // mesma lógica para os textos

  return (
    <S.Holder
      style={{
        backgroundColor,
        border: `2px solid ${borderColor}`,
      }}
    >
      <S.Icon style={{ color: textColor }}>{icon}</S.Icon>
      <S.Main style={{ color: textColor }}>
        {formatNumberWithCommas(total)}
        {helper}
      </S.Main>
      <S.Text style={{ color: textColor }}>{t(text)}</S.Text>
    </S.Holder>
  );
};
