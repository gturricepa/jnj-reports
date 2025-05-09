import { Title } from "../../components/title";
import { AcitivitieCommentaryDrive } from "./commentarydrive";
import { AcitivitiePIFS } from "./pifs";
import * as S from "./styles";

export const Acitivities = () => {
  return (
    <S.Holder>
      <Title title="activities" />
      <AcitivitiePIFS />
      <AcitivitieCommentaryDrive />
    </S.Holder>
  );
};
