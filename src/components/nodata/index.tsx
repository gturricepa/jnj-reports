import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { paleteColors } from "../../styles/theme";

export const NoData: React.FC = () => {
  const { t } = useTranslation();
  return (
    <S.Holder>
      {/* <WarningOutlined style={{ fontSize: 50, color: "#ff4d4f" }} /> */}
      <WarningOutlined style={{ fontSize: 50, color: paleteColors[3] }} />

      <h2>{t("NoData")}</h2>
      <p>{t("NoDataDesc")}</p>
    </S.Holder>
  );
};
