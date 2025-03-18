import React from "react";
import { AccidentData } from "../../types/Accident";
import useFetchData from "../../hooks/useFetchData";
import { LoadingIndicator } from "../../components/loading";
import * as S from "./styles";
import { Title } from "../../components/title";
import { separeByYear } from "./helper";
import { AccidentsTable } from "./table";
import { AccidentsBarChart } from "./radarChart";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AvoidableChart from "./pizzaChart";

export const Accidents: React.FC = () => {
  const { filteredData, loading } =
    useFetchData<AccidentData>("accidents.xlsx");
  const perspective = useSelector((state: RootState) => state.user.perspective);
  const escope = useSelector((state: RootState) => state.user.Escope);

  if (loading) return <LoadingIndicator />;

  const result = separeByYear(filteredData);
  const years = Object.keys(result);

  const filterDataByRegion = (region: string) => {
    return filteredData.filter(
      (data) => data.Region && data.Region.trim() === region.trim()
    );
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

    XLSX.writeFile(workbook, "download.xlsx");
  };

  return (
    <S.Holder>
      <Title title="accidents" />
      <S.Content>
        {perspective === "country" ? (
          <>
            <AccidentsTable
              last={result[years[0]] || []}
              actual={result[years[1]] || []}
              years={years}
              data={filteredData}
            />
            <AccidentsBarChart actual={result[years[1]] || []} />
            <S.Divsion>
              <AvoidableChart title={years[0]} data={result[years[0]] || []} />
              <AvoidableChart title={years[1]} data={result[years[1]] || []} />
            </S.Divsion>
          </>
        ) : (
          <>
            {escope.map((region, index) => {
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
                    data={filteredDataByRegion}
                  />
                </div>
              );
            })}

            {escope.map((region, index) => {
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
                  />
                </div>
              );
            })}
            <S.Divsion>
              {escope.map((region, index) => {
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
