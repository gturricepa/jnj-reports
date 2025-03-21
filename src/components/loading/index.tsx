import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { redPalete } from "../../styles/theme";

export const LoadingIndicator: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 24, color: redPalete[0] }} spin />
        }
      />
    </div>
  );
};
