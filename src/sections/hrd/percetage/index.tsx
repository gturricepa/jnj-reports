import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { PercetageHRDData } from "../../../types/HRD";
import * as XLSX from "xlsx";

export const PercetageHrd: React.FC = () => {
  const [data, setData] = useState<PercetageHRDData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/assets/percetage_hrd.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<PercetageHRDData>(worksheet);
      setData(jsonData);
    };

    fetchData();
  }, []);

  // const handleDownload = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(data); // Use `data` para download
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
  //   XLSX.writeFile(workbook, "download.xlsx");
  // };

  return (
    <>
      <S.Table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Actives</th>
            <th>HRD</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Country}</td>
              <td>{item.Actives}</td>
              <td>{item.HRD}</td>
              <td>{(+item.Results * 100).toFixed(2)} %</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
      {/* <S.DButton onClick={handleDownload}>Download</S.DButton> */}
    </>
  );
};
