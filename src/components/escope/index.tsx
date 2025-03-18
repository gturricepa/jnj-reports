import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { EyeOutlined } from "@ant-design/icons";
import * as S from "./styles";
export const Escope: React.FC = () => {
  const escope = useSelector((state: RootState) => state.user.Escope);
  return (
    <S.Holder>
      <EyeOutlined />
      {escope!.map((item, index) => (
        <p
          key={index}
          style={{
            padding: "0.2rem .5rem",
            fontWeight: "bold",
          }}
        >
          {item}
        </p>
      ))}
    </S.Holder>
  );
};
