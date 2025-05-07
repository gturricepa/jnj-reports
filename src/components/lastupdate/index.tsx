import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as S from "./styles";
import * as XLSX from "xlsx";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import { LoadingIndicator } from "../loading";

interface UpdateData {
  Update: number;
}

export const LastUpdate = () => {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://d2r5fctg8zmglu.cloudfront.net/assets/update.xlsx"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: UpdateData[] = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length > 0 && jsonData[0].Update) {
          const excelEpoch = new Date(1899, 11, 30);
          const convertedDate = new Date(
            excelEpoch.getTime() + Number(jsonData[0].Update) * 86400000
          );
          setLastUpdate(convertedDate);
        }
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

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return currentLanguage === "en"
      ? `${month}/${day}/${year}`
      : `${day}/${month}/${year}`;
  };

  if (loading)
    return (
      <S.Holder>
        <LoadingIndicator />
      </S.Holder>
    );
  if (error) return <S.Holder>{error}</S.Holder>;

  return (
    <S.Holder>
      <p>
        {t("lastUpdate")}: {formatDate(lastUpdate)}
      </p>
    </S.Holder>
  );
};
