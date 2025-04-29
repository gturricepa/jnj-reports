import React, { useEffect } from "react";
import { Title } from "../../components/title";
import useFetchData from "../../hooks/useFetchData";
import * as S from "./styles";
import { ComplianceData } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LoadingIndicator } from "../../components/loading";
import { Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ComplianceTable } from "./table";
import { ComplianceChartByRegion } from "./chart";

export const Compliance = () => {
  const { filteredData, loading } =
    useFetchData<ComplianceData>("compliance.xlsx");
  const [selectedOperatingGroups, setSelectedOperatingGroups] = React.useState<
    string[]
  >([]);
  const [selectedSectors, setSelectedSectors] = React.useState<string[]>([]);
  const perspective = useSelector((state: RootState) => state.user.perspective);
  const user = useSelector((state: RootState) => state.user);

  // const { t } = useTranslation();

  useEffect(() => {
    setSelectedOperatingGroups([]);
    setSelectedSectors([]);
  }, [perspective, user.selectedCountry]);

  if (loading) return <LoadingIndicator />;

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

  return (
    <S.Holder>
      <Title title="Compliance" />
      <>
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
        {perspective === "country" ? (
          <>
            {" "}
            <ComplianceTable data={filteredDataByFilters} />
          </>
        ) : (
          <ComplianceChartByRegion data={filteredDataByFilters} />
        )}
      </>
    </S.Holder>
  );
};
