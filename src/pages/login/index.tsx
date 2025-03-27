import * as S from "./styles";
import logoJnJ from "../../assets/jj.svg";
import logoCepa from "../../assets/cepa23.png";
import svg from "../../assets/world2.svg";
// import svg from "../../assets/word2.svg";

// import svg from "../../assets/texture.svg";
// import svg from "../../assets/texture3.avif";

import { Language } from "../../components/language";
import { LoginForm } from "../../components/form";

export const Login = () => {
  return (
    <S.Holder>
      <S.LeftPanel>
        <img style={{ width: "20rem" }} src={logoJnJ} alt="JnJ logo" />
      </S.LeftPanel>
      <Language />
      <S.RightPanel>
        <img
          style={{
            width: "40%",
            zIndex: "-155555",
            position: "fixed",
            opacity: "0.05",
            // opacity: "0.02",
            left: "30%",
            top: "0",
          }}
          src={svg}
        />

        <S.Content>
          <h1>CEPA REPORTS</h1>
          <h2>SAFE FLEET</h2>
          <LoginForm />
          <img
            src={logoCepa}
            alt="logo Cepa"
            style={{
              width: "9rem",
              display: "flex",
              justifySelf: "center",
              alignSelf: "center",
            }}
          />
        </S.Content>
      </S.RightPanel>
    </S.Holder>
  );
};
