import React from "react";
import { Collapse } from "antd";
import { MainData } from "../../../types/MainData";
import { getCountryCode } from "../../../components/country/helper";
import Flag from "react-world-flags";
import * as S from "./styles";
import { Card } from "../../../components/card";
import {
  AimOutlined,
  AlertOutlined,
  CarOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

interface SectorData {
  Miles: number;
  AccidentCount: number;
  VehiclesCount: number;
  AccidentsWithInjuries: number;
}

interface OperationGroupData {
  Miles: number;
  AccidentCount: number;
  VehiclesCount: number;
  AccidentsWithInjuries: number;
  sectors: Record<string, SectorData>;
}

interface CountryData {
  Region: string;
  Miles: number;
  AccidentCount: number;
  VehiclesCount: number;
  AccidentsWithInjuries: number;
  operationGroups: Record<string, OperationGroupData>;
}

interface CollapseGeneralProps {
  data: MainData[];
}

export const CollapseGeneral: React.FC<CollapseGeneralProps> = ({ data }) => {
  const { t } = useTranslation();

  const countryData = data.reduce<Record<string, CountryData>>((acc, item) => {
    const {
      Region,
      Country,
      Miles,
      "Accident Count": accidentCount,
      "Vehicles Count": vehiclesCount,
      "# Accidents with Injuries": accidentsWithInjuries,
    } = item;

    const milesValue = parseFloat(Miles) || 0;
    const accidentCountValue = parseInt(accidentCount, 10) || 0;
    const vehiclesCountValue = parseInt(vehiclesCount, 10) || 0;
    const accidentsWithInjuriesValue = parseInt(accidentsWithInjuries, 10) || 0;

    if (!acc[Country]) {
      acc[Country] = {
        Region: Region,
        Miles: 0,
        AccidentCount: 0,
        VehiclesCount: 0,
        AccidentsWithInjuries: 0,
        operationGroups: {},
      };
    }
    acc[Country].Miles += milesValue;
    acc[Country].AccidentCount += accidentCountValue;
    acc[Country].VehiclesCount += vehiclesCountValue;
    acc[Country].AccidentsWithInjuries += accidentsWithInjuriesValue;

    const groupKey = item["Operating Group"];
    const sectorKey = item.Sector;

    if (!acc[Country].operationGroups[groupKey]) {
      acc[Country].operationGroups[groupKey] = {
        Miles: 0,
        AccidentCount: 0,
        VehiclesCount: 0,
        AccidentsWithInjuries: 0,
        sectors: {},
      };
    }

    acc[Country].operationGroups[groupKey].Miles += milesValue;
    acc[Country].operationGroups[groupKey].AccidentCount += accidentCountValue;
    acc[Country].operationGroups[groupKey].VehiclesCount += vehiclesCountValue;
    acc[Country].operationGroups[groupKey].AccidentsWithInjuries +=
      accidentsWithInjuriesValue;

    if (!acc[Country].operationGroups[groupKey].sectors[sectorKey]) {
      acc[Country].operationGroups[groupKey].sectors[sectorKey] = {
        Miles: 0,
        AccidentCount: 0,
        VehiclesCount: 0,
        AccidentsWithInjuries: 0,
      };
    }
    acc[Country].operationGroups[groupKey].sectors[sectorKey].Miles +=
      milesValue;
    acc[Country].operationGroups[groupKey].sectors[sectorKey].AccidentCount +=
      accidentCountValue;
    acc[Country].operationGroups[groupKey].sectors[sectorKey].VehiclesCount +=
      vehiclesCountValue;
    acc[Country].operationGroups[groupKey].sectors[
      sectorKey
    ].AccidentsWithInjuries += accidentsWithInjuriesValue;

    return acc;
  }, {});

  const countryKeys = Object.keys(countryData);
  const defaultActiveKey = countryKeys.length > 0 ? [countryKeys[0]] : [];

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      style={{
        width: "100%",
        marginTop: "1rem",
        backgroundColor: "white",
      }}
    >
      {countryKeys.map((country) => (
        <Panel
          header={
            <span style={{ fontSize: "1rem" }}>
              <Flag
                code={getCountryCode(country)}
                style={{ width: "20px", marginRight: "5px" }}
              />
              {country}
            </span>
          }
          key={country}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <S.CardHolder>
              <Card
                total={countryData[country].Miles}
                text="totalMiles"
                icon={<DashboardOutlined />}
              />
              <Card
                total={countryData[country].AccidentCount}
                text="totalAccidents"
                icon={<AlertOutlined />}
              />
              <Card
                total={countryData[country].VehiclesCount}
                text="totalVehicles"
                icon={<CarOutlined />}
              />
              <Card
                total={countryData[country].AccidentsWithInjuries}
                text="accidentsWithInjuries"
                icon={<UserOutlined />}
              />
              <Card
                total={(
                  (countryData[country].AccidentCount * 1000000) /
                  countryData[country].Miles
                ).toFixed(2)}
                text="accumulatedCPMM"
                icon={<AimOutlined />}
                color={true}
                region={countryData[country].Region}
                type="CPMM"
              />
              <Card
                total={(
                  (countryData[country].AccidentsWithInjuries * 1000000) /
                  countryData[country].Miles
                ).toFixed(2)}
                text="Acumulated IPMM"
                icon={<AimOutlined />}
                color={true}
                region={countryData[country].Region}
                type="IPMM"
              />
            </S.CardHolder>
            <S.ListHolder>
              <ul style={{ paddingLeft: "20px" }}>
                {Object.keys(countryData[country].operationGroups).map(
                  (groupKey) => (
                    <li key={groupKey}>
                      <Collapse style={{ backgroundColor: "white" }}>
                        <Panel header={groupKey} key={groupKey}>
                          <S.ValueHolder>
                            <span>
                              {t("miles")}:{" "}
                              {
                                countryData[country].operationGroups[groupKey]
                                  .Miles
                              }
                            </span>
                            <span>
                              {t("accidents")}:{" "}
                              {
                                countryData[country].operationGroups[groupKey]
                                  .AccidentCount
                              }
                            </span>
                            <span>
                              {t("vehicles")}: :{" "}
                              {
                                countryData[country].operationGroups[groupKey]
                                  .VehiclesCount
                              }
                            </span>
                            <span>
                              {t("accidentsWithInjuries")}:{" "}
                              {
                                countryData[country].operationGroups[groupKey]
                                  .AccidentsWithInjuries
                              }
                            </span>
                            <span>
                              {t("accumulatedCPMM")}:{" "}
                              {(
                                (countryData[country].operationGroups[groupKey]
                                  .AccidentCount *
                                  1000000) /
                                countryData[country].operationGroups[groupKey]
                                  .Miles
                              ).toFixed(2)}
                            </span>
                            <span>
                              {t("Accumulated IPMM")}:{" "}
                              {(
                                (countryData[country].operationGroups[groupKey]
                                  .AccidentsWithInjuries *
                                  1000000) /
                                countryData[country].operationGroups[groupKey]
                                  .Miles
                              ).toFixed(2)}
                            </span>
                          </S.ValueHolder>
                          <Collapse style={{ backgroundColor: "white" }}>
                            {Object.keys(
                              countryData[country].operationGroups[groupKey]
                                .sectors
                            ).map((sectorKey) => (
                              <Panel header={sectorKey} key={sectorKey}>
                                <S.ValueHolder>
                                  <span>
                                    {t("miles")}:{" "}
                                    {
                                      countryData[country].operationGroups[
                                        groupKey
                                      ].sectors[sectorKey].Miles
                                    }
                                  </span>
                                  <span>
                                    {t("accidents")}:{" "}
                                    {
                                      countryData[country].operationGroups[
                                        groupKey
                                      ].sectors[sectorKey].AccidentCount
                                    }
                                  </span>
                                  <span>
                                    {t("vehicles")}:{" "}
                                    {
                                      countryData[country].operationGroups[
                                        groupKey
                                      ].sectors[sectorKey].VehiclesCount
                                    }
                                  </span>
                                  <span>
                                    {t("accidentsWithInjuries")}:{" "}
                                    {
                                      countryData[country].operationGroups[
                                        groupKey
                                      ].sectors[sectorKey].AccidentsWithInjuries
                                    }
                                  </span>
                                </S.ValueHolder>
                              </Panel>
                            ))}
                          </Collapse>
                        </Panel>
                      </Collapse>
                    </li>
                  )
                )}
              </ul>
            </S.ListHolder>
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};
