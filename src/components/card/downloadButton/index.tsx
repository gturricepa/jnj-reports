import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import * as S from "./styles";
interface DownloadButtonProps {
  onClick: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  return (
    <S.Holder onClick={onClick}>
      <DownloadOutlined />
    </S.Holder>
  );
};
