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

export const Home: React.FC = () => {
  return (
    <S.Holder>
      <Menu />
      <S.Main>
        <Perspective />
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
        <section id="general">
          <General />
        </section>

        <section id="training">
          <Training />
        </section>
      </S.Main>

      <Footer />
    </S.Holder>
  );
};
