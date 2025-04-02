import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import * as S from "./styles";
import * as XLSX from "xlsx";
import { RangeTimeData } from "../../types/RageTime";

export const RangeTime = () => {
  const [data, setData] = useState<RangeTimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/assets/update.xlsx");
        if (!response.ok) throw new Error("Network response was not ok");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData as RangeTimeData[]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao carregar os dados.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <S.Holder>
      <Tooltip
        title={`Accumulated data from ${data[0].From} - ${data[0].To}`}
        placement="bottom"
      >
        <CalendarOutlined style={{ fontSize: "12px", cursor: "pointer" }} />
      </Tooltip>
    </S.Holder>
  );
};
