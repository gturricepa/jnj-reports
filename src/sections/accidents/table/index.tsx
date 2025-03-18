import React from "react";
import { AccidentData } from "../../../types/Accident";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { NoData } from "../../../components/nodata";

interface AccidentsTableProps {
  last: AccidentData[];
  actual: AccidentData[];
  years: string[];
  data: AccidentData[];
}

export const AccidentsTable: React.FC<AccidentsTableProps> = ({
  last,
  actual,
  years,
}) => {
  const { t } = useTranslation();
  const uniqueClassifications = Array.from(
    new Set([
      ...last.map((accident) => accident.Classification),
      ...actual.map((accident) => accident.Classification),
    ])
  );

  const classificationCounts: {
    [key: string]: { last: number; actual: number };
  } = {};

  let totalLast = 0;
  let totalActual = 0;

  uniqueClassifications.forEach((classification) => {
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

  if (uniqueClassifications.length === 0) {
    return <NoData />;
  }

  return (
    <S.Table>
      <thead>
        <tr>
          <th>{t("classification")}</th>
          <th>{years[0]}</th>
          <th>{years[1]}</th>
          {/* <th></th> */}
        </tr>
      </thead>
      <tbody>
        {uniqueClassifications.map((classification) => (
          <tr key={classification}>
            <td>{t(classification)}</td>
            <td>{classificationCounts[classification].last}</td>
            <td>{classificationCounts[classification].actual}</td>
            <td>
              <strong>
                {/* {classificationCounts[classification].last +
                  classificationCounts[classification].actual} */}
              </strong>
            </td>
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
          <td>{/* <strong>{grandTotal}</strong> */}</td>
        </tr>
      </tbody>
    </S.Table>
  );
};
