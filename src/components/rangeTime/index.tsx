import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import * as S from "./styles";
import * as XLSX from "xlsx";
import { RangeTimeData } from "../../types/RageTime";
import { useTranslation } from "react-i18next";

export const RangeTime = () => {
  const [data, setData] = useState<RangeTimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://d2r5fctg8zmglu.cloudfront.net/update.xlsx"
        );
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
        title={`${t("showingAccumulatedDataFrom")} ${t(data[0].From)} ${t(
          "-"
        )} ${t(data[0].To)}`}
        placement="bottom"
      >
        <CalendarOutlined style={{ fontSize: "12px", cursor: "pointer" }} />
      </Tooltip>
    </S.Holder>
  );
};
