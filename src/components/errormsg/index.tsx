import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface ErrorMsgProps {
  text: string;
}

export const ErrorMsg: React.FC<ErrorMsgProps> = ({ text }) => {
  const { t } = useTranslation();
  return <S.Holder>{t(text)}</S.Holder>;
};
