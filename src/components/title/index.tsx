import { useTranslation } from "react-i18next";
import * as S from "./styles";

interface TitleProps {
  title: string;
  complement?: string;
}

export const Title: React.FC<TitleProps> = ({ title, complement }) => {
  const { t } = useTranslation();

  return (
    <S.Title>
      {t(title)}
      {complement && complement}
    </S.Title>
  );
};
