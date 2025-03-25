import React, { useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { LoadingIndicator } from "../../components/loading";
import * as S from "./styles";
import { Title } from "../../components/title";
import { HRDData } from "../../types/HRD";
import { HRDCard } from "./card";
import { TableHrd } from "./tableHrd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { PercetageHrd } from "./percetage";
import { Select } from "antd";
import { downloadExcel } from "../../helper/downloadExcel";
import BarChartHrd from "./barchart";
import { CenterTitle } from "../../components/centerTitle";

export const HRD: React.FC = () => {
  const { filteredData, loading } = useFetchData<HRDData>("HRD.xlsx");
  const perspective = useSelector((state: RootState) => state.user.perspective);
  const escope = useSelector((state: RootState) => state.user.Escope);

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

  useEffect(() => {
    setSelectedOperatingGroups([]);
    setSelectedSectors([]);
  }, [perspective]);

  const filterDataByOperatingGroupAndSector = (data: HRDData[]) => {
    return data.filter((item) => {
      const matchesGroup =
        selectedOperatingGroups.length === 0 ||
        selectedOperatingGroups.includes(item["Operating Group"]);
      const matchesSector =
        selectedSectors.length === 0 ||
        selectedSectors.includes(item["Sector"]);
      return matchesGroup && matchesSector;
    });
  };

  const filteredDataByOperatingGroupAndSector =
    filterDataByOperatingGroupAndSector(filteredData);

  const filterDataByRegion = (region: string) => {
    return filteredDataByOperatingGroupAndSector.filter(
      (data) => data.Region && data.Region.trim() === region.trim()
    );
  };

  if (loading) return <LoadingIndicator />;

  const handleDownload = () => {
    const columnsToDownload: (keyof HRDData)[] = [
      "Country",
      "E-mail",
      "Corporate ID",
      "Operating Group",
      "Franchise",
      "Sector",
      "Type",
    ];
    downloadExcel(
      filteredDataByOperatingGroupAndSector,
      columnsToDownload,
      "hrd.xlsx"
    );
  };

  return (
    <S.Holder>
      <Title title="HRD" />
      {filteredData.length > 0 && (
        <S.FiltersSearch>
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
        </S.FiltersSearch>
      )}

      {perspective === "country" ? (
        <>
          {filteredDataByOperatingGroupAndSector.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
            >
              <HRDCard data={filteredDataByOperatingGroupAndSector} />
              <BarChartHrd data={filteredDataByOperatingGroupAndSector} />
            </div>
          )}

          <TableHrd data={filteredDataByOperatingGroupAndSector} />
        </>
      ) : (
        <>
          <S.Division>
            {escope?.map((region, index) => (
              <div key={index} style={{ marginTop: "1rem" }}>
                <CenterTitle value={region} />
                <HRDCard data={filterDataByRegion(region)} />
              </div>
            ))}
          </S.Division>
          {filteredData.length > 0 ? (
            <S.DButton onClick={handleDownload}>Download</S.DButton>
          ) : null}
          <PercetageHrd />
        </>
      )}
    </S.Holder>
  );
};
