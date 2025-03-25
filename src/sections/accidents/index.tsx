import React, { useEffect } from "react";
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
import { CenterTitle } from "../../components/centerTitle";
import { downloadExcel } from "../../helper/downloadExcel";
import { Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ChartTitle } from "../../components/chartitle";

export const Accidents: React.FC = () => {
  const { filteredData, loading } =
    useFetchData<AccidentData>("accidents.xlsx");
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
    downloadExcel(filteredDataByFilters, columnsToDownload, "fines.xlsx");
  };

  useEffect(() => {
    setSelectedOperatingGroups([]);
    setSelectedSectors([]);
  }, [perspective]);

  if (loading) return <LoadingIndicator />;
  return (
    <S.Holder>
      <Title title="accidents" />
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

      {user!.selectedCountry!.length > 0 && perspective === "country" && (
        <CenterTitle value="Crashes by Classification" />
      )}
      <S.Content>
        {perspective === "country" ? (
          <>
            <div
              style={{
                display: "flex",
                width: result[years[1]].length > 0 ? "40rem" : "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <AccidentsTable
                last={result[years[0]] || []}
                actual={result[years[1]] || []}
                years={years}
                classifications={allClassifications}
              />
            </div>
            {result[years[1]].length > 0 && (
              <AccidentsBarChart
                actual={result[years[1]] || []}
                classifications={allClassifications}
              />
            )}
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
                  <ChartTitle value={region} />
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
                  <ChartTitle value={`${region} - ${years[1]}`} />
                  <AccidentsBarChart
                    actual={resultByRegion[yearsByRegion[1]].reverse() || []}
                    classifications={allClassifications}
                  />
                </div>
              );
            })}
          </>
        )}
      </S.Content>
      {filteredDataByFilters.length > 0 ? (
        <button onClick={handleDownload}>Download</button>
      ) : null}
    </S.Holder>
  );
};
