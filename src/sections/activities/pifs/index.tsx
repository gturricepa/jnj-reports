import { useSelector } from "react-redux";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";

import {
  ArrowRightOutlined,
  RiseOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { ActivitesDataPIFS } from "../types";
import useFetchData from "../../../hooks/useFetchData";
import { RootState } from "../../../store/store";
import { LoadingIndicator } from "../../../components/loading";
import { downloadExcel } from "../../../helper/downloadExcel";
import { Select } from "antd";
import { ActivitiesSimpleBarChart } from "../barchart";
import { Card } from "../../../components/card";
import { CenterTitle } from "../../../components/centerTitle";
import { NoData } from "../../../components/nodata";
import { DownloadButton } from "../../../components/card/downloadButton";
import { DescTitle } from "../../../components/desctitle";

export const AcitivitiePIFS = () => {
  const { filteredData, loading } =
    useFetchData<ActivitesDataPIFS>("activities.xlsx"); //mudei o xlsx para Operationg group e sector para franchise e Sector  e Region
  const perspective = useSelector((state: RootState) => state.user.perspective);
  const escope = useSelector((state: RootState) => state.user.Escope);
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

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

  const filterDataByOperatingGroupAndSector = (data: ActivitesDataPIFS[]) => {
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

  const OkCount = filteredDataByOperatingGroupAndSector.filter(
    (item) => item.Status === "Complete"
  ).length;
  const PendingCount = filteredDataByOperatingGroupAndSector.filter(
    (item) => item.Status === "Pending"
  ).length;

  const chartData = [
    {
      name: "",
      Completed: OkCount,
      Pending: PendingCount,
    },
  ];

  const totalDrives = OkCount + PendingCount;

  const okPercetage =
    (OkCount / filteredDataByOperatingGroupAndSector.length) * 100;
  if (loading) return <LoadingIndicator />;

  const handleDownload = () => {
    const columnsToDownload: (keyof ActivitesDataPIFS)[] = [
      "Region",
      "Corporate ID",
      "Status",
      "Operating Group",
      "Country",
      "Operating Group",
      "Sector",
      "Status",
      "Classification",
    ];

    downloadExcel(
      filteredDataByOperatingGroupAndSector,
      columnsToDownload,
      "activities.xlsx"
    );
  };

  const filterByRegion = (data: ActivitesDataPIFS[], region: string) => {
    return data.filter((item) => item.Region === region);
  };

  return (
    <S.Holder>
      <DescTitle title="PIFS" />
      {filteredData.length > 0 && (
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
          <S.Main>
            {perspective === "country" ? (
              <>
                <ActivitiesSimpleBarChart
                  data={chartData}
                  trainingCompleteCount={OkCount}
                  pendingCount={PendingCount}
                />

                <S.CardHolder>
                  <Card
                    icon={<ThunderboltOutlined />}
                    total={totalDrives}
                    text={t("accidents")}
                  />
                  <Card
                    icon={<RiseOutlined />}
                    total={OkCount}
                    // text={"Trainings Realized 2025"}
                    text={`${t("Complete")}`}
                  />
                  <Card
                    icon={<TrophyOutlined />}
                    total={+okPercetage.toFixed()}
                    text={"Complete"}
                    helper="%"
                  />
                </S.CardHolder>
              </>
            ) : (
              escope!.length > 0 &&
              escope!.map((region) => (
                <S.Escope>
                  <S.Region>
                    <CenterTitle value={region} />
                    {filteredDataByOperatingGroupAndSector.length > 0 ? (
                      <ActivitiesSimpleBarChart
                        data={chartData}
                        trainingCompleteCount={
                          filterByRegion(
                            filteredDataByOperatingGroupAndSector.filter(
                              (item) => item.Status === "Complete"
                            ),
                            region
                          ).length
                        }
                        pendingCount={
                          filterByRegion(
                            filteredDataByOperatingGroupAndSector.filter(
                              (item) => item.Status === "Pending"
                            ),
                            region
                          ).length
                        }
                      />
                    ) : (
                      <NoData />
                    )}
                  </S.Region>
                  {region === "NA" ? (
                    <S.MapHolder>
                      <Card
                        icon={<ThunderboltOutlined />}
                        total={totalDrives}
                        text={t("accidents")}
                      />
                      <Card
                        icon={<RiseOutlined />}
                        total={OkCount}
                        // text={"Trainings Realized 2025"}
                        text={`${t("Complete")}`}
                      />
                      <Card
                        icon={<TrophyOutlined />}
                        total={+okPercetage.toFixed()}
                        text={"Complete"}
                        helper="%"
                      />
                    </S.MapHolder>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <NoData />
                    </div>
                  )}

                  {/* 

                  <S.MapHolder>
                    <Card
                      icon={<UsergroupAddOutlined />}
                      total={
                        filterByRegion(
                          filteredDataByOperatingGroupAndSector,
                          region
                        ).length
                      }
                      text={"drivers"}
                    />

                    <Card
                      icon={<RiseOutlined />}
                      total={
                        filterByRegion(
                          filteredDataByOperatingGroupAndSector.filter(
                            (item) => {
                              const realizedDate = excelDateToUTC(
                                item.Realized
                              );
                              return realizedDate.getUTCFullYear() === 2025;
                            }
                          ),
                          region
                        ).length
                      }
                      text={`${t("trainingsRealized")} 2025`}
                    />

                    <Card
                      icon={<TrophyOutlined />}
                      total={
                        filteredDataByOperatingGroupAndSector.length > 0
                          ? Number(
                              (filterByRegion(
                                filteredDataByOperatingGroupAndSector.filter(
                                  (item) => item.Status === "Ok"
                                ),
                                region
                              ).length /
                                filterByRegion(
                                  filteredDataByOperatingGroupAndSector,
                                  region
                                ).length) *
                                100
                            ).toFixed()
                          : 0
                      }
                      text={"fleetTrained"}
                      helper="%"
                    />
                  </S.MapHolder> */}
                </S.Escope>
              ))
            )}
          </S.Main>
        </>
      )}
      {filteredData.length > 0 ? (
        <DownloadButton onClick={handleDownload} />
      ) : null}
      {filteredData.length === 0 && (
        <>
          <NoData />
        </>
      )}
    </S.Holder>
  );
};
