import React from "react";
import { AccidentData } from "../../types/Accident";
import useFetchData from "../../hooks/useFetchData";
import { LoadingIndicator } from "../../components/loading";
import * as S from "./styles";
import { Title } from "../../components/title";
import { separeByYear } from "./helper";
import { AccidentsTable } from "./table";
import { AccidentsBarChart } from "./radarChart";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AvoidableChart from "./pizzaChart";
import { CenterTitle } from "../../components/centerTitle";
import { downloadExcel } from "../../helper/downloadExcel";

export const Accidents: React.FC = () => {
  const { filteredData, loading } =
    useFetchData<AccidentData>("accidents.xlsx");
  const perspective = useSelector((state: RootState) => state.user.perspective);
  const escope = useSelector((state: RootState) => state.user.Escope);
  const user = useSelector((state: RootState) => state.user);

  if (loading) return <LoadingIndicator />;

  const result = separeByYear(filteredData);
  const years = Object.keys(result);

  const filterDataByRegion = (region: string) => {
    return filteredData.filter(
      (data) => data.Region && data.Region.trim() === region.trim()
    );
  };

  const getAllClassifications = () => {
    const classifications = new Set<string>();
    filteredData.forEach((accident) => {
      if (accident.Classification) {
        classifications.add(accident.Classification);
      }
    });
    return Array.from(classifications);
  };

  const allClassifications = getAllClassifications();

  const handleDownload = () => {
    const columnsToDownload: (keyof AccidentData)[] = [
      "Country",
      "Corporate ID",
      "Operating Group",
      "Franchise",
      "Sector",
      "Type",
      "Avoidable",
      "Collision Classification",
      "Classification",
      "Brief Report",
    ];
    downloadExcel(filteredData, columnsToDownload, "fines.xlsx");
  };

  return (
    <S.Holder>
      <Title title="accidents" />
      {user!.selectedCountry!.length > 0 && perspective === "country" && (
        <CenterTitle value="Crashes by Classification" />
      )}
      <S.Content>
        {perspective === "country" ? (
          <>
            <div
              style={{
                display: "flex",

                width: years[1] ? "40rem" : "100%",
                justifyContent: "center",
              }}
            >
              <AccidentsTable
                last={result[years[0]] || []}
                actual={result[years[1]] || []}
                years={years}
                classifications={allClassifications}
              />
            </div>
            {years[1] && (
              <AccidentsBarChart
                actual={result[years[1]] || []}
                classifications={allClassifications}
              />
            )}
            {user!.selectedCountry!.length > 0 && perspective === "country" && (
              <div style={{ marginTop: "1rem" }}></div>
            )}
            {user!.selectedCountry!.length > 0 && perspective === "country" && (
              <CenterTitle
                space={true}
                value="Distribution of Preventable Crashes"
              />
            )}{" "}
            <S.Divsion>
              <AvoidableChart title={years[0]} data={result[years[0]] || []} />
              {years[1] && (
                <AvoidableChart
                  title={years[1]}
                  data={result[years[1]] || []}
                />
              )}
            </S.Divsion>
          </>
        ) : (
          <>
            {user!.selectedCountry!.length > 0 && (
              <CenterTitle value="Crashes Classification by Region" />
            )}{" "}
            {escope!.map((region, index) => {
              const filteredDataByRegion = filterDataByRegion(region);
              const resultByRegion = separeByYear(filteredDataByRegion);
              const yearsByRegion = Object.keys(resultByRegion);

              return (
                <div key={index}>
                  <h2
                    style={{
                      margin: 0,
                      padding: 0,
                      marginBottom: ".5rem",
                      marginTop: ".5rem",
                    }}
                  >
                    {region}
                  </h2>
                  <AccidentsTable
                    last={resultByRegion[yearsByRegion[0]] || []}
                    actual={resultByRegion[yearsByRegion[1]] || []}
                    years={yearsByRegion}
                    classifications={allClassifications}
                  />
                </div>
              );
            })}
            {user!.selectedCountry!.length > 0 && (
              <>
                <CenterTitle
                  space={true}
                  value="Distribution of Crashes by Country/Region"
                />
              </>
            )}{" "}
            {escope!.map((region, index) => {
              const filteredDataByRegion = filterDataByRegion(region);
              const resultByRegion = separeByYear(filteredDataByRegion);
              const yearsByRegion = Object.keys(resultByRegion);

              return (
                <div key={`chart-${index}`}>
                  <h2>
                    {region} - {years[1]}
                  </h2>
                  <AccidentsBarChart
                    actual={resultByRegion[yearsByRegion[1]] || []}
                    classifications={allClassifications}
                  />
                </div>
              );
            })}
            <CenterTitle space={true} value="Preventable Crashses by Region" />
            <S.Divsion>
              {escope!.map((region, index) => {
                const filteredDataByRegion = filterDataByRegion(region);
                const resultByRegion = separeByYear(filteredDataByRegion);
                const yearsByRegion = Object.keys(resultByRegion);

                return (
                  <div key={`chart-${index}`}>
                    <h2>
                      {region} - {years[1]}
                    </h2>
                    <AvoidableChart
                      title=""
                      data={resultByRegion[yearsByRegion[1]] || []}
                    />
                  </div>
                );
              })}
            </S.Divsion>
          </>
        )}
      </S.Content>
      {filteredData.length > 0 ? (
        <button onClick={handleDownload}>Download</button>
      ) : null}
    </S.Holder>
  );
};
