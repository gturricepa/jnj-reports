import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { PushpinOutlined } from "@ant-design/icons";

interface TitleProps {
  title: string;
  complement?: string;
}

export const DescTitle: React.FC<TitleProps> = ({ title, complement }) => {
  const { t } = useTranslation();

  return (
    <S.Title>
      <PushpinOutlined style={{ marginRight: ".3rem" }} />
      {t(title)}
      {complement && complement}
    </S.Title>
  );
};
