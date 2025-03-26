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
import { redPalete } from "../../../styles/theme";
import { ChartTitle } from "../../../components/chartitle";

interface AccidentsBarChartProps {
  actual: AccidentData[];
  classifications: string[];
}

export const AccidentsBarChart: React.FC<AccidentsBarChartProps> = ({
  actual,
  classifications,
}) => {
  const { t } = useTranslation();
  const selectedCountries = useSelector(
    (state: RootState) => state.user.selectedCountry
  );
  const perspective = useSelector((state: RootState) => state.user.perspective);

  if (!actual || actual.length === 0) {
    return <NoData />;
  }

  const dataMap: Record<string, Record<string, number>> = {};

  actual.forEach((accident) => {
    const { Country: country, Classification: classification } = accident;

    if (selectedCountries?.includes(country)) {
      if (!dataMap[classification]) {
        dataMap[classification] = {};
      }
      dataMap[classification][country] =
        (dataMap[classification][country] || 0) + 1;
    }
  });

  const data = classifications.map((classification) => ({
    classification: t(classification),
    ...(dataMap[classification] || {}),
  }));

  const uniqueCountries = Array.from(
    new Set(actual.map((accident) => accident.Country))
  );

  // const colors = [
  //   "#ee1100",
  //   "#ff0000",
  //   "#ff3333",
  //   "#ff6666",
  //   "#ff9999",
  //   "#ffcccc",
  // ];

  const currentYear = new Date().getFullYear();

  return (
    <S.Holder>
      {perspective === "country" && (
        <ChartTitle value={currentYear.toString()} />
      )}
      <ResponsiveContainer height={460}>
        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            dataKey="classification"
            type="category"
            width={290}
            style={{ fontSize: "13px" }}
          />
          <XAxis type="number" />
          <Tooltip
            contentStyle={{
              maxWidth: "300px",
              whiteSpace: "normal",
              fontSize: "13px",
            }}
          />

          {uniqueCountries.map((country, index) => (
            <Bar
              key={country}
              dataKey={country}
              fill={redPalete[index % redPalete.length]}
              stackId="a"
              isAnimationActive={true}
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
              fontSize: "13px",
            }}
          >
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: redPalete[index % redPalete.length],
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
