import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { HomeOutlined } from "@ant-design/icons";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <S.Holder>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <S.Button onClick={() => navigate("/")}>
        <HomeOutlined />
      </S.Button>{" "}
    </S.Holder>
  );
};
