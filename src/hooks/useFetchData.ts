import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { DataUser, UserState } from "../types/User";
import { applyDataFilter } from "../helper/filterFunctions";

const useFetchData = <T extends DataUser>(filename: string) => {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user) as UserState;
  const isToggled = useSelector((state: RootState) => state.dummy.isToggled);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://d2r5fctg8zmglu.cloudfront.net/assets/${filename}`
        );
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data: T[] = XLSX.utils.sheet_to_json(worksheet);
        const filtered = applyDataFilter(data, user);
        setFilteredData(filtered);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filename, user, isToggled]);

  return { filteredData, loading };
};

export default useFetchData;
