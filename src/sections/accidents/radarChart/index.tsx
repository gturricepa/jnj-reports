import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AccidentData } from "../../../types/Accident";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { NoData } from "../../../components/nodata";

interface AccidentsBarChartProps {
  actual: AccidentData[];
}

export const AccidentsBarChart: React.FC<AccidentsBarChartProps> = ({
  actual,
}) => {
  const { t } = useTranslation();
  const selectedCountries = useSelector(
    (state: RootState) => state.user.selectedCountry
  );

  if (!actual || actual.length === 0) {
    return <NoData />;
  }

  const dataMap: Record<string, Record<string, number>> = {};

  actual.forEach((accident) => {
    const country = accident.Country;
    const classification = accident.Classification;

    if (selectedCountries?.includes(country)) {
      if (!dataMap[classification]) {
        dataMap[classification] = {};
      }

      if (!dataMap[classification][country]) {
        dataMap[classification][country] = 0;
      }

      dataMap[classification][country]++;
    }
  });

  const data = Object.keys(dataMap).map((classification) => {
    const classificationData: { classification: string } = {
      classification: t(classification),
    };
    Object.entries(dataMap[classification]).forEach(([country, count]) => {
      classificationData[country] = count;
    });
    return classificationData;
  });

  const uniqueCountries = Array.from(
    new Set(actual.map((accident) => accident.Country))
  );

  const colors = [
    "#ee1100",
    "#ff0000",
    "#ff3333",
    "#ff6666",
    "#ff9999",
    "#ffcccc",
  ];
  const currentYear = new Date().getFullYear();

  return (
    <S.Holder>
      <ResponsiveContainer height={560}>
        {/* <h3>{currentYear}</h3> */}

        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            dataKey="classification"
            type="category"
            width={250}
            style={{ fontSize: "14px" }}
          />
          <XAxis type="number" />
          <Tooltip contentStyle={{ maxWidth: "300px", whiteSpace: "normal" }} />

          {uniqueCountries.map((country, index) => (
            <Bar
              key={country}
              dataKey={country}
              fill={colors[index % colors.length]}
              stackId="a"
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <S.Legend>
        {uniqueCountries.map((country, index) => (
          <div
            key={country}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: colors[index % colors.length],
                marginLeft: 5,
                marginRight: 3,

                borderRadius: "50%",
              }}
            />
            <span>{country}</span>
          </div>
        ))}
      </S.Legend>
    </S.Holder>
  );
};
