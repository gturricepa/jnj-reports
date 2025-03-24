import React from "react";
import * as S from "./styles";
import { Title } from "../../components/title";
import { LoadingIndicator } from "../../components/loading";
import useFetchData from "../../hooks/useFetchData";
import { PreventableData } from "../../types/Preventable";
import { Select } from "antd";
import { PreventableBarChart } from "./barchart";
import { PreventablePizzaChart } from "./pizzaChart";
import { CenterTitle } from "../../components/centerTitle";
import { ArrowRightOutlined } from "@ant-design/icons";
import { NoData } from "../../components/nodata";

// import { PreventablePizzaChart } from "./pizzaChart";

export const Avoidability: React.FC = () => {
  const { filteredData, loading } =
    useFetchData<PreventableData>("preventable.xlsx");
  const [selectedOperatingGroups, setSelectedOperatingGroups] = React.useState<
    string[]
  >([]);
  const [selectedSectors, setSelectedSectors] = React.useState<string[]>([]);

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

  return (
    <S.Holder>
      <Title title="Preventable" />
      {filteredDataByFilters.length ? (
        <>
          <S.Filters>
            <ArrowRightOutlined />
            <Select
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
          <CenterTitle space={false} value="Preventable Crashses" />
          <S.PizzaChart>
            <PreventablePizzaChart data={last} year={years[0]} />
            <PreventablePizzaChart data={actual} year={years[1]} />
          </S.PizzaChart>
          <CenterTitle space={false} value="Preventable CPMM Crashses" />
          <S.PizzaChart>
            <PreventableBarChart data={last} year={years[0]} />
            <PreventableBarChart data={actual} year={years[1]} />
          </S.PizzaChart>
        </>
      ) : (
        <>
          <NoData />
        </>
      )}
    </S.Holder>
  );
};
