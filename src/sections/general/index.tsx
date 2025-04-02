import React, { useEffect } from "react";
// import { AccidentData } from "../../types/Accident";
import useFetchData from "../../hooks/useFetchData";
import { LoadingIndicator } from "../../components/loading";
import * as S from "./styles";
import { Title } from "../../components/title";
// import { MockSpace } from "../../components/mockspace";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { MainData } from "../../types/MainData";
import { NoData } from "../../components/nodata";
import { Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
// import { GeneralTable } from "./tableGeral";
import { CollapseGeneral } from "./accordion";
// import { GeneralTable } from "./tableGeral";
import { CollapseGeneralRegion } from "./accordionRegion";

export const General: React.FC = () => {
  const { filteredData, loading } = useFetchData<MainData>("maindata.xlsx");

  const perspective = useSelector((state: RootState) => state.user.perspective);
  // const escope = useSelector((state: RootState) => state.user.Escope);
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

  useEffect(() => {
    setSelectedOperatingGroups([]);
    setSelectedSectors([]);
  }, [perspective, user.selectedCountry]);

  const filterDataByOperatingGroupAndSector = (data: MainData[]) => {
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

  // const filterDataByRegion = (region: string) => {
  //   return filteredDataByOperatingGroupAndSector.filter(
  //     (data) => data.Region && data.Region.trim() === region.trim()
  //   );
  // };

  if (loading) return <LoadingIndicator />;

  console.log(filteredDataByOperatingGroupAndSector);

  return (
    <S.Holder>
      <Title title="general" />
      {filteredData.length > 0 ? (
        <>
          <S.FiltersSearch>
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
          </S.FiltersSearch>
          {perspective === "country" ? (
            <>
              <CollapseGeneral data={filteredDataByOperatingGroupAndSector} />{" "}
            </>
          ) : (
            <>
              <CollapseGeneralRegion
                data={filteredDataByOperatingGroupAndSector}
              />
            </>
          )}

          <>
            {/*
             */}
            {/* <GeneralTable data={filteredDataByOperatingGroupAndSector} /> */}
            {/* <GeneralTable data={filteredDataByOperatingGroupAndSector} /> */}
          </>
        </>
      ) : (
        <NoData />
      )}
    </S.Holder>
  );
};
