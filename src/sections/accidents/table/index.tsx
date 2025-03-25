import React from "react";
import { AccidentData } from "../../../types/Accident";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { NoData } from "../../../components/nodata";
// import { RootState } from "../../../store/store";
// import { useSelector } from "react-redux";

interface AccidentsTableProps {
  last: AccidentData[];
  actual: AccidentData[];
  years: string[];
  classifications: string[];
}

export const AccidentsTable: React.FC<AccidentsTableProps> = ({
  last,
  actual,
  years,
  classifications,
}) => {
  const { t } = useTranslation();
  // const perspective = useSelector((state: RootState) => state.user.perspective);

  const classificationCounts: {
    [key: string]: { last: number; actual: number };
  } = {};

  let totalLast = 0;
  let totalActual = 0;

  classifications.forEach((classification) => {
    const lastCount = last.filter(
      (accident) => accident.Classification === classification
    ).length;
    const actualCount = actual.filter(
      (accident) => accident.Classification === classification
    ).length;

    classificationCounts[classification] = {
      last: lastCount,
      actual: actualCount,
    };

    totalLast += lastCount;
    totalActual += actualCount;
  });

  if (classifications.length === 0) {
    return <NoData />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        justifySelf: "center",
        alignContent: "center",
        width: "40rem",
      }}
    >
      <S.Table>
        <thead>
          <tr>
            <th>{t("classification")}</th>
            <th>{years[0]}</th>
            <th>{years[1]}</th>
          </tr>
        </thead>
        <tbody>
          {classifications.map((classification) => (
            <tr key={classification}>
              <td>{t(classification)}</td>
              <td>{classificationCounts[classification]?.last || 0}</td>
              <td>{classificationCounts[classification]?.actual || 0}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>TOTAL</strong>
            </td>
            <td>
              <strong>{totalLast}</strong>
            </td>
            <td>
              <strong>{totalActual}</strong>
            </td>
          </tr>
        </tbody>
      </S.Table>
    </div>
  );
};
