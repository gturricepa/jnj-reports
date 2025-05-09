import React, { useEffect } from "react";
import * as S from "./styles";

import {
  ArrowRightOutlined,
  RiseOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import useFetchData from "../../../hooks/useFetchData";
import { TrainingBTWData, TrainingData } from "../../../types/Training";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useTranslation } from "react-i18next";
import { LoadingIndicator } from "../../../components/loading";
import { downloadExcel } from "../../../helper/downloadExcel";
import { Select } from "antd";
import { TrainingSimpleBarChart } from "../barchart";
import { CenterTitle } from "../../../components/centerTitle";
import { DownloadButton } from "../../../components/card/downloadButton";
import { NoData } from "../../../components/nodata";
import { Card } from "../../../components/card";
import { DescTitle } from "../../../components/desctitle";

export const TrainingBTW: React.FC = () => {
  const { filteredData, loading } =
    useFetchData<TrainingBTWData>("training.xlsx");
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

  const filterDataByOperatingGroupAndSector = (data: TrainingData[]) => {
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

  const excelDateToUTC = (excelDate: string) => {
    const serial = parseInt(excelDate, 10);
    const utcDate = new Date((serial - 25569) * 86400 * 1000);
    return utcDate;
  };

  const count2025 = filteredDataByOperatingGroupAndSector.filter((item) => {
    const realizedDate = excelDateToUTC(item.Realized);
    return realizedDate.getUTCFullYear() === 2025;
  }).length;

  const OkCount = filteredDataByOperatingGroupAndSector.filter(
    (item) => item.Status === "Ok"
  ).length;
  const PendingCount = filteredDataByOperatingGroupAndSector.filter(
    (item) => item.Status === "Pending"
  ).length;
  const NoTrainingCount = filteredDataByOperatingGroupAndSector.filter(
    (item) => item.Status === "No training"
  ).length;

  const chartData = [
    {
      name: "",
      "Training Completed": OkCount,
      Pending: PendingCount,
      "No training": NoTrainingCount,
    },
  ];

  const totalDrives = OkCount + PendingCount + NoTrainingCount;
  const okPercetage =
    (OkCount / filteredDataByOperatingGroupAndSector.length) * 100;
  if (loading) return <LoadingIndicator />;

  const handleDownload = () => {
    const columnsToDownload: (keyof TrainingData)[] = [
      "WWID",
      "Realized",
      "Status",
      "Expiration Date",
      "Country",
      "Operating Group",
      "Sector",
      "Type",
    ];
    downloadExcel(
      filteredDataByOperatingGroupAndSector,
      columnsToDownload,
      "training.xlsx"
    );
  };

  const filterByRegion = (data: TrainingData[], region: string) => {
    return data.filter((item) => item.Region === region);
  };

  return (
    <S.Holder>
      {filteredData.length > 0 && (
        <>
          <DescTitle title="BTW" />
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
                <TrainingSimpleBarChart
                  data={chartData}
                  trainingCompleteCount={OkCount}
                  noTrainingCount={NoTrainingCount}
                  pendingCount={PendingCount}
                />
                <S.CardHolder>
                  <Card
                    icon={<UsergroupAddOutlined />}
                    total={totalDrives}
                    text={"drivers"}
                  />
                  <Card
                    icon={<RiseOutlined />}
                    total={count2025}
                    // text={"Trainings Realized 2025"}
                    text={`${t("trainingsRealized")} 2025`}
                  />
                  <Card
                    icon={<TrophyOutlined />}
                    total={+okPercetage.toFixed()}
                    text={"fleetTrained"}
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
                    <TrainingSimpleBarChart
                      data={chartData}
                      trainingCompleteCount={
                        filterByRegion(
                          filteredDataByOperatingGroupAndSector.filter(
                            (item) => item.Status === "Ok"
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
                      noTrainingCount={
                        filterByRegion(
                          filteredDataByOperatingGroupAndSector.filter(
                            (item) => item.Status === "No training"
                          ),
                          region
                        ).length
                      }
                    />
                  </S.Region>

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
                  </S.MapHolder>
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
