import * as S from "./styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../store/userSlice";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store/store";
import { Country } from "../country";
import { Escope } from "../escope";
import logo from "../../assets/jnj2.png";
export const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <S.Menu>
      <img
        src={logo}
        alt="logo"
        style={{ width: "2.6rem", borderRadius: "50px" }}
      />
      <h4 onClick={() => handleScroll("general")}>{t("general")}</h4>

      <h4 onClick={() => handleScroll("accidents")}>{t("accidents")}</h4>
      <h4 onClick={() => handleScroll("fines")}>{t("fines")}</h4>
      <h4 onClick={() => handleScroll("hrd")}>{t("HRD")}</h4>
      <h4 onClick={() => handleScroll("avoidability")}>{t("avoidability")}</h4>
      <h4 onClick={() => handleScroll("training")}>{t("training")}</h4>

      <div>
        {user.perspective === "country" ? <Country /> : <Escope />}

        <p>
          {t("welcome")}, {user.Nick}
        </p>
        <LogoutOutlined onClick={handleLogout} />
      </div>
    </S.Menu>
  );
};
