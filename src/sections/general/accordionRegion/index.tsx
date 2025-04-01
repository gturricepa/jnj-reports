import React from "react";
import { Collapse } from "antd";
import { MainData } from "../../../types/MainData";
import * as S from "./styles";
import { Card } from "../../../components/card";
import {
  AlertOutlined,
  CarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

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

interface RegionData {
  Miles: number;
  AccidentCount: number;
  VehiclesCount: number;
  AccidentsWithInjuries: number;
  operationGroups: Record<string, OperationGroupData>;
}

interface CollapseGeneralProps {
  data: MainData[];
}

export const CollapseGeneralRegion: React.FC<CollapseGeneralProps> = ({
  data,
}) => {
  const regionData = data.reduce<Record<string, RegionData>>((acc, item) => {
    const {
      Region,
      Miles,
      "Accident Count": accidentCount,
      "Vehicles Count": vehiclesCount,
      "# Accidents with Injuries": accidentsWithInjuries,
    } = item;

    const milesValue = parseFloat(Miles) || 0;
    const accidentCountValue = parseInt(accidentCount, 10) || 0;
    const vehiclesCountValue = parseInt(vehiclesCount, 10) || 0;
    const injuriesCountValue = parseInt(accidentsWithInjuries, 10) || 0;

    if (!acc[Region]) {
      acc[Region] = {
        Miles: 0,
        AccidentCount: 0,
        VehiclesCount: 0,
        AccidentsWithInjuries: 0,
        operationGroups: {},
      };
    }

    acc[Region].Miles += milesValue;
    acc[Region].AccidentCount += accidentCountValue;
    acc[Region].VehiclesCount += vehiclesCountValue;
    acc[Region].AccidentsWithInjuries += injuriesCountValue;

    const groupKey = item["Operating Group"];
    const sectorKey = item.Sector;

    if (!acc[Region].operationGroups[groupKey]) {
      acc[Region].operationGroups[groupKey] = {
        Miles: 0,
        AccidentCount: 0,
        VehiclesCount: 0,
        AccidentsWithInjuries: 0,
        sectors: {},
      };
    }

    acc[Region].operationGroups[groupKey].Miles += milesValue;
    acc[Region].operationGroups[groupKey].AccidentCount += accidentCountValue;
    acc[Region].operationGroups[groupKey].VehiclesCount += vehiclesCountValue;
    acc[Region].operationGroups[groupKey].AccidentsWithInjuries +=
      injuriesCountValue;

    if (!acc[Region].operationGroups[groupKey].sectors[sectorKey]) {
      acc[Region].operationGroups[groupKey].sectors[sectorKey] = {
        Miles: 0,
        AccidentCount: 0,
        VehiclesCount: 0,
        AccidentsWithInjuries: 0,
      };
    }

    acc[Region].operationGroups[groupKey].sectors[sectorKey].Miles +=
      milesValue;
    acc[Region].operationGroups[groupKey].sectors[sectorKey].AccidentCount +=
      accidentCountValue;
    acc[Region].operationGroups[groupKey].sectors[sectorKey].VehiclesCount +=
      vehiclesCountValue;
    acc[Region].operationGroups[groupKey].sectors[
      sectorKey
    ].AccidentsWithInjuries += injuriesCountValue;

    return acc;
  }, {});

  const regionKeys = Object.keys(regionData).reverse();
  const defaultActiveKey = regionKeys.length > 0 ? [regionKeys[0]] : [];

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      style={{
        width: "100%",
        marginTop: "1rem",
        backgroundColor: "white",
      }}
    >
      {regionKeys.map((region) => (
        <Panel
          header={<span style={{ fontSize: "1rem" }}>{region}</span>}
          key={region}
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
                total={regionData[region].Miles}
                text="Total Miles"
                icon={<DashboardOutlined />}
              />
              <Card
                total={regionData[region].AccidentCount}
                text="Total Accidents"
                icon={<AlertOutlined />}
              />
              <Card
                total={regionData[region].VehiclesCount}
                text="Total Vehicles"
                icon={<CarOutlined />}
              />
              <Card
                total={regionData[region].AccidentsWithInjuries}
                text="# Accidents with Injuries"
                icon={<AlertOutlined />}
              />
            </S.CardHolder>
            <S.ListHolder>
              <ul style={{ paddingLeft: "20px" }}>
                {Object.keys(regionData[region].operationGroups).map(
                  (groupKey) => (
                    <li key={groupKey}>
                      <Collapse style={{ backgroundColor: "white" }}>
                        <Panel header={groupKey} key={groupKey}>
                          <S.ValueHolder>
                            <span>
                              Total Miles:{" "}
                              {
                                regionData[region].operationGroups[groupKey]
                                  .Miles
                              }
                            </span>
                            <span>
                              Total Accidents:{" "}
                              {
                                regionData[region].operationGroups[groupKey]
                                  .AccidentCount
                              }
                            </span>
                            <span>
                              Total Vehicles:{" "}
                              {
                                regionData[region].operationGroups[groupKey]
                                  .VehiclesCount
                              }
                            </span>
                            <span>
                              Accidents with Injuries:{" "}
                              {
                                regionData[region].operationGroups[groupKey]
                                  .AccidentsWithInjuries
                              }
                            </span>
                          </S.ValueHolder>
                          <Collapse style={{ backgroundColor: "white" }}>
                            {Object.keys(
                              regionData[region].operationGroups[groupKey]
                                .sectors
                            ).map((sectorKey) => (
                              <Panel header={sectorKey} key={sectorKey}>
                                <S.ValueHolder>
                                  <span>
                                    Miles:{" "}
                                    {
                                      regionData[region].operationGroups[
                                        groupKey
                                      ].sectors[sectorKey].Miles
                                    }
                                  </span>
                                  <span>
                                    Accidents:{" "}
                                    {
                                      regionData[region].operationGroups[
                                        groupKey
                                      ].sectors[sectorKey].AccidentCount
                                    }
                                  </span>
                                  <span>
                                    Vehicles:{" "}
                                    {
                                      regionData[region].operationGroups[
                                        groupKey
                                      ].sectors[sectorKey].VehiclesCount
                                    }
                                  </span>
                                  <span>
                                    # Accidents with Injuries:{" "}
                                    {
                                      regionData[region].operationGroups[
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
