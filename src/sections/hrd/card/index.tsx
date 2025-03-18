import { NoData } from "../../../components/nodata";
import { HRDData } from "../../../types/HRD";
import * as S from "./styles";

interface CardProps {
  data: HRDData[];
}

export const HRDCard: React.FC<CardProps> = ({ data }) => {
  if (data.length === 0) {
    return <NoData />;
  }

  return (
    <S.Holder>
      <p>{data.length}</p>
      <span>HRD drivers</span>
    </S.Holder>
  );
};
