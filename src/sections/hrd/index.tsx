import React from "react";
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

export const HRD: React.FC = () => {
  const { filteredData, loading } = useFetchData<HRDData>("HRD.xlsx");
  const perspective = useSelector((state: RootState) => state.user.perspective);
  const escope = useSelector((state: RootState) => state.user.Escope);
  const [selectedOperatingGroups, setSelectedOperatingGroups] = React.useState<
    string[]
  >([]);

  const handleOperatingGroupChange = (value: string[]) => {
    setSelectedOperatingGroups(value);
  };

  const filterDataByOperatingGroup = (data: HRDData[]) => {
    if (selectedOperatingGroups.length === 0) return data;
    return data.filter((item) =>
      selectedOperatingGroups.includes(item["Operating Group"])
    );
  };

  const filteredDataByOperatingGroup = filterDataByOperatingGroup(filteredData);

  const filterDataByRegion = (region: string) => {
    return filteredData.filter(
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
    downloadExcel(filteredDataByOperatingGroup, columnsToDownload, "hrd.xlsx");
  };
  return (
    <S.Holder>
      <Title title="HRD" />

      {perspective === "country" ? (
        <>
          {filteredDataByOperatingGroup.length > 0 && (
            <Select
              mode="multiple"
              style={{
                width: "30%",
                marginTop: 16,
                display: "flex",
                justifySelf: "flex-start",
                alignSelf: "flex-start",
              }}
              placeholder="Operation Groups"
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
          )}

          {filteredDataByOperatingGroup.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
            >
              <HRDCard data={filteredDataByOperatingGroup} />
              <BarChartHrd data={filteredDataByOperatingGroup} />
            </div>
          )}

          <TableHrd data={filteredDataByOperatingGroup} />
        </>
      ) : (
        <>
          <S.Division>
            {escope?.map((region, index) => (
              <div key={index}>
                <h3>{region}</h3>
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
