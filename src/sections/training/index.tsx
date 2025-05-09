import React from "react";
import * as S from "./styles";
import { TrainingBTW } from "./btw";
import { Title } from "../../components/title";

export const Training: React.FC = () => {
  return (
    <S.Holder>
      <Title title="training" />
      <TrainingBTW />
    </S.Holder>
  );
};
