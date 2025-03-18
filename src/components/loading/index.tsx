import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const LoadingIndicator: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 24, color: "#ee1100" }} spin />
        }
      />
    </div>
  );
};
