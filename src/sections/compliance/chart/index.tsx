import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { ComplianceData } from "../types";
import { towPositionsChartPalete } from "../../../styles/theme";
import { ChartTitle } from "../../../components/chartitle";

interface ComplianceChartByRegionProps {
  data: ComplianceData[];
}

const COLORS = [towPositionsChartPalete[0], towPositionsChartPalete[1]];

export const ComplianceChartByRegion: React.FC<
  ComplianceChartByRegionProps
> = ({ data }) => {
  const regionGroups = data.reduce<Record<string, ComplianceData[]>>(
    (acc, item) => {
      if (!acc[item.Region]) {
        acc[item.Region] = [];
      }
      acc[item.Region].push(item);
      return acc;
    },
    {}
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      {Object.entries(regionGroups).map(([region, regionData]) => {
        const completeCount = regionData.filter(
          (item) => item.Status === "Complete"
        ).length;
        const incompleteCount = regionData.filter(
          (item) => item.Status === "Incomplete"
        ).length;
        const total = completeCount + incompleteCount;

        if (total === 0) return null;

        const chartData = [
          { name: "Complete", value: completeCount },
          { name: "Incomplete", value: incompleteCount },
        ];

        return (
          <div
            key={region}
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <ChartTitle value={region} />
            {/* <h3></h3> */}
            <PieChart width={500} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        );
      })}
    </div>
  );
};
