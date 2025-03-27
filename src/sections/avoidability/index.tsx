import React, { useEffect } from "react";
import * as S from "./styles";
import { Title } from "../../components/title";
import { LoadingIndicator } from "../../components/loading";
import useFetchData from "../../hooks/useFetchData";
import { PreventableData } from "../../types/Preventable";
import { Select } from "antd";
import { PreventableBarChart } from "./barchart";
import { PreventableSimpleBarChart } from "./pizzaChart";
import { CenterTitle } from "../../components/centerTitle";
import { ArrowRightOutlined } from "@ant-design/icons";
import { NoData } from "../../components/nodata";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GroupedBarChart } from "./biaxialbarchart";
import { PreventableBarChartByRegion } from "./barpreventable";
import { downloadExcel } from "../../helper/downloadExcel";

// import { PreventablePizzaChart } from "./pizzaChart";

export const Avoidability: React.FC = () => {
  const { filteredData, loading } =
    useFetchData<PreventableData>("preventable.xlsx");
  const [selectedOperatingGroups, setSelectedOperatingGroups] = React.useState<
    string[]
  >([]);
  const [selectedSectors, setSelectedSectors] = React.useState<string[]>([]);
  const perspective = useSelector((state: RootState) => state.user.perspective);
  const user = useSelector((state: RootState) => state.user);

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

  const years = Array.from(
    new Set(filteredDataByFilters.map((item) => item.Year))
  )
    .map(Number)
    .sort((a, b) => a - b);

  const last = filteredDataByFilters.filter(
    (item) => Number(item.Year) === years[0]
  );
  const actual = filteredDataByFilters.filter(
    (item) => Number(item.Year) === years[1]
  );

  const handleDownload = () => {
    const columnsToDownload: (keyof PreventableData)[] = [
      "Country",
      "CPMM No Data",
      "CPMM Not Preventable",
      "CPMM Preventable",
      "Miles",
      "Year",
      "Operating Group",
      "Sector",
      "Region",
      "Yes",
      "No",
      "No Data",
    ];
    downloadExcel(filteredDataByFilters, columnsToDownload, "preventable.xlsx");
  };

  return (
    <S.Holder>
      <Title title="Preventable" />
      {filteredDataByFilters.length ? (
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
              <CenterTitle space={false} value="Preventable Crashses" />

              <S.PizzaChart>
                {last.length > 0 && (
                  <PreventableSimpleBarChart data={last} year={years[0]} />
                )}
                {actual.length > 0 && (
                  <PreventableSimpleBarChart data={actual} year={years[1]} />
                )}
              </S.PizzaChart>
              <CenterTitle space={true} value="Preventable CPMM Crashses" />
              <S.PizzaChart>
                {last.length > 0 && (
                  <PreventableBarChart data={last} year={years[0]} />
                )}
                {actual.length > 0 && (
                  <PreventableBarChart data={actual} year={years[1]} />
                )}
              </S.PizzaChart>
            </>
          ) : (
            <>
              <CenterTitle
                space={false}
                value="Preventable Crashses by Region"
              />

              <S.PizzaChart>
                {last.length > 0 && (
                  <PreventableBarChartByRegion data={last} year={years[0]} />
                )}
                {actual.length > 0 && (
                  <PreventableBarChartByRegion data={actual} year={years[1]} />
                )}
              </S.PizzaChart>
              <CenterTitle
                space={true}
                value="Preventable CPMM Crashses by Region"
              />

              <S.PizzaChart>
                {last.length > 0 && (
                  <GroupedBarChart data={last} year={years[0]} />
                )}
                {actual.length > 0 && (
                  <GroupedBarChart data={actual} year={years[1]} />
                )}
              </S.PizzaChart>
            </>
          )}
        </>
      ) : (
        <>
          <NoData />
        </>
      )}
      {filteredDataByFilters.length > 0 ? (
        <button onClick={handleDownload}>Download</button>
      ) : null}
    </S.Holder>
  );
};
