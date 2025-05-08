import React from "react";
import { Accidents } from "../../sections/accidents";
import { General } from "../../sections/general";
import { Avoidability } from "../../sections/avoidability";
import { Menu } from "../../components/menu";
import * as S from "./styles";
import { Fines } from "../../sections/fines";
import { Training } from "../../sections/training";
import { Footer } from "../../components/footer";
import { HRD } from "../../sections/hrd";
import { Perspective } from "../../components/perspective";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FlagOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Compliance } from "../../sections/compliance";
import { Acitivities } from "../../sections/activities";

export const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  return (
    <S.Holder>
      <Menu />
      <S.Main>
        {user!.selectedCountry!.length > 0 ? (
          <>
            <Perspective />

            <section id="general">
              <General />
            </section>

            <section id="accidents">
              <Accidents />
              <section id="fines">
                <Fines />
              </section>
              <section id="hrd">
                <HRD />
              </section>
            </section>
            <section id="avoidability">
              <Avoidability />
            </section>
            <section id="training">
              <Training />
            </section>
            <section id="activities">
              <Acitivities />
            </section>
            <section id="compliance">
              <Compliance />
            </section>
          </>
        ) : (
          <S.SelectCountry>
            <div>
              <FlagOutlined />
              <p>{t("pleaseOneCountry")}</p>
            </div>
          </S.SelectCountry>
        )}
      </S.Main>

      <Footer />
    </S.Holder>
  );
};
