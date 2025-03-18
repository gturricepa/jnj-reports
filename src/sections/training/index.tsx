import React from "react";
import { AccidentData } from "../../types/Accident";
import useFetchData from "../../hooks/useFetchData";
import { LoadingIndicator } from "../../components/loading";
import * as S from "./styles";
import { Title } from "../../components/title";
import { MockSpace } from "../../components/mockspace";

export const Training: React.FC = () => {
  // const { filteredData, loading } = useFetchData<AccidentData>(
  //   "acidentes 2024.xlsx"
  // );

  // if (loading) return <LoadingIndicator />;

  // console.log(filteredData);

  return (
    <S.Holder>
      <Title title="training" />
      <MockSpace />
    </S.Holder>
  );
};
