import React, { useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { LoadingIndicator } from "../../components/loading";
import * as S from "./styles";
import { Title } from "../../components/title";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { separeByYear } from "../accidents/helper";
import { AccidentsTable } from "../accidents/table";
import { AccidentsBarChart } from "../accidents/radarChart";
import { FinesData } from "../../types/Fines";
import { UnsedData } from "../../components/unsedata";
import { CenterTitle } from "../../components/centerTitle";
import { downloadExcel } from "../../helper/downloadExcel";
import { Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ChartTitle } from "../../components/chartitle";
import { DownloadButton } from "../../components/card/downloadButton";

export const Fines: React.FC = () => {
  const { filteredData, loading } = useFetchData<FinesData>(
    "multas_templatew.xlsx"
  );
  const perspective = useSelector((state: RootState) => state.user.perspective);
  const escope = useSelector((state: RootState) => state.user.Escope);
  const user = useSelector((state: RootState) => state.user);

  const [selectedOperatingGroups, setSelectedOperatingGroups] = React.useState<
    string[]
  >([]);
  const [selectedSectors, setSelectedSectors] = React.useState<string[]>([]);

  const handleOperatingGroupChange = (value: string[]) => {
    setSelectedOperatingGroups(value);
  };

  const handleSectorChange = (value: string[]) => {
    setSelectedSectors(value);
  };

  const filterData = () => {
    return filteredData.filter((item) => {
      const matchesOperatingGroup =
        selectedOperatingGroups.length === 0 ||
        selectedOperatingGroups.includes(item["Operating Group"]);
      const matchesSector =
        selectedSectors.length === 0 ||
        selectedSectors.includes(item["Sector"]);
      return matchesOperatingGroup && matchesSector;
    });
  };

  const filteredDataByFilters = filterData();

  const result = separeByYear(filteredDataByFilters);
  const years = Object.keys(result);

  const filterDataByRegion = (region: string) => {
    return filteredDataByFilters.filter(
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

  const handleDownload = () => {
    const columnsToDownload: (keyof FinesData)[] = [
      "Country",
      "Corporate ID",
      "Operating Group",
      "Franchise",
      "Sector",
      "Type",
    ];
    downloadExcel(filteredDataByFilters, columnsToDownload, "fines.xlsx");
  };

  useEffect(() => {
    setSelectedOperatingGroups([]);
    setSelectedSectors([]);
  }, [perspective, user.selectedCountry]);

  if (
    (user.selectedCountry!.length === 1 &&
      user.selectedCountry![0] === "United States of America") ||
    (user.selectedCountry!.length === 1 &&
      user.selectedCountry![0] === "Canada") ||
    (user.selectedCountry!.length === 1 &&
      user.selectedCountry![0] === "Puerto Rico NA") ||
    user.selectedCountry === "United States of America" ||
    (user.selectedCountry!.length === 2 &&
      user.selectedCountry![0] === "United States of America" &&
      user.selectedCountry![1] === "Canada") ||
    (user.selectedCountry!.length === 2 &&
      user.selectedCountry![0] === "Canada" &&
      user.selectedCountry![1] === "United States of America")
  ) {
    return (
      <S.Holder>
        <Title title="fines" />
        <UnsedData />
      </S.Holder>
    );
  }
  if (loading) return <LoadingIndicator />;

  const allClassifications = getAllClassifications();

  return (
    <S.Holder>
      <Title title="fines" />
      {filteredData.length > 0 && (
        <S.Filters>
          <ArrowRightOutlined />
          <Select
            maxTagCount={"responsive"}
            mode="multiple"
            style={{ width: "15%" }}
            placeholder="Operating Groups"
            onChange={handleOperatingGroupChange}
          >
            {Array.from(
              new Set(filteredData.map((item) => item["Operating Group"]))
            ).map((group) => (
              <Select.Option key={group} value={group}>
                {group}
              </Select.Option>
            ))}
          </Select>
          <Select
            maxTagCount={"responsive"}
            mode="multiple"
            style={{ width: "15%" }}
            placeholder="Sectors"
            onChange={handleSectorChange}
          >
            {Array.from(
              new Set(filteredData.map((item) => item["Sector"]))
            ).map((sector) => (
              <Select.Option key={sector} value={sector}>
                {sector}
              </Select.Option>
            ))}
          </Select>
        </S.Filters>
      )}

      {user!.selectedCountry!.length > 0 &&
        perspective === "country" &&
        filteredData.length > 0 && (
          <CenterTitle value="Fines by Classification" />
        )}
      <S.Content>
        {}
        {perspective === "country" ? (
          <>
            <S.Divsion />
            <AccidentsTable
              last={result[years[0]] || []}
              actual={result[years[1]] || []}
              years={years}
              classifications={allClassifications}
            />
            {result[years[1]].length > 0 && (
              <AccidentsBarChart
                classifications={allClassifications}
                actual={result[years[1]] || []}
              />
            )}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              marginTop: "1rem",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <S.Divsion>
              <div
                style={{
                  display: "flex",
                  marginTop: "1rem",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CenterTitle value="Fines Classification by Region" />

                {escope!.map((region, index) => {
                  const filteredDataByRegion = filterDataByRegion(region);
                  const resultByRegion = separeByYear(filteredDataByRegion);
                  const yearsByRegion = Object.keys(resultByRegion);
                  return (
                    <div key={index}>
                      {region !== "NA" && <ChartTitle value={region} />}

                      {region === "NA" && filteredDataByRegion.length === 0 ? (
                        <></>
                      ) : (
                        <AccidentsTable
                          last={resultByRegion[yearsByRegion[0]] || []}
                          actual={resultByRegion[yearsByRegion[1]] || []}
                          years={yearsByRegion}
                          classifications={allClassifications}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <S.Divsion>
                <div style={{ marginTop: "1rem" }}>
                  <CenterTitle value="Distribution of Fines by Country/Region" />

                  {escope!.map((region, index) => {
                    const filteredDataByRegion = filterDataByRegion(region);
                    const resultByRegion = separeByYear(filteredDataByRegion);
                    const yearsByRegion = Object.keys(resultByRegion);

                    return (
                      <div key={`chart-${index}`}>
                        {region !== "NA" && (
                          <ChartTitle value={`${region} - ${years[1]}`} />
                        )}

                        {region === "NA" &&
                        filteredDataByRegion.length === 0 ? (
                          <></>
                        ) : (
                          <AccidentsBarChart
                            actual={resultByRegion[yearsByRegion[1]] || []}
                            classifications={allClassifications}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </S.Divsion>
            </S.Divsion>
          </div>
        )}
      </S.Content>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {perspective !== "country" && <UnsedData />}
      </div>

      {filteredData.length > 0 ? (
        <DownloadButton onClick={handleDownload} />
      ) : null}
    </S.Holder>
  );
};
