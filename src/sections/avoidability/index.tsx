import React from "react";
// import { AccidentData } from "../../types/Accident";
import * as S from "./styles";
import { Title } from "../../components/title";
// import useFetchData from "../../hooks/useFetchData";
// import { LoadingIndicator } from "../../components/loading";
import { MockSpace } from "../../components/mockspace";

export const Avoidability: React.FC = () => {
  // const { filteredData, loading } = useFetchData<AccidentData>(
  //   "acidentes 2024.xlsx"
  // );

  // if (loading) return <LoadingIndicator />;

  // console.log(filteredData);

  return (
    <S.Holder>
      <Title title="avoidability" />
      <MockSpace />
    </S.Holder>
  );
};
