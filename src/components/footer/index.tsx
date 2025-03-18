import * as S from "./styles";
import logo from "../../assets/logonegativo.png";
export const Footer = () => {
  return (
    <S.Holder>
      <img
        src={logo}
        alt="logo"
        style={{ width: "2rem", marginRight: "1rem" }}
      />
      <span>Cepa Mobility - © 2025.</span>
    </S.Holder>
  );
};
