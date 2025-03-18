import React from "react";
// import { WarningOutlined } from "@ant-design/icons";
import * as S from "./styles";
// import { useTranslation } from "react-i18next";

export const UnsedData: React.FC = () => {
  // const { t } = useTranslation();
  return (
    <S.Holder>
      {/* <WarningOutlined style={{ fontSize: 50, color: "#ff4d4f" }} /> */}
      <p>Fine data is not registred for the NA region</p>
    </S.Holder>
  );
};
