import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { paleteColors } from "../../styles/theme";

export const UnsedData: React.FC = () => {
  const { t } = useTranslation();
  return (
    <S.Holder>
      {/* <WarningOutlined style={{ fontSize: 50, color: "#ff4d4f" }} /> */}
      <InfoCircleOutlined style={{ fontSize: 25, color: paleteColors[3] }} />
      <h2>{t("fineNotFOrNA")}</h2>
    </S.Holder>
  );
};
