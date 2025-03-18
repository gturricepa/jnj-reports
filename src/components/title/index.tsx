import { useTranslation } from "react-i18next";
import * as S from "./styles";

interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  const { t } = useTranslation();

  return <S.Title>{t(title)}</S.Title>;
};
