import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { PercetageHRDData } from "../../../types/HRD";
import * as XLSX from "xlsx";
import Flag from "react-world-flags";
import { getCountryCode } from "../../../components/country/helper";

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
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Flag
                  code={getCountryCode(item.Country)}
                  style={{ width: "20px", marginRight: "5px" }}
                />
                <p style={{ margin: 0, width: "3rem" }}>
                  {item.Country === "United States of America"
                    ? "USA"
                    : item.Country}
                </p>
              </td>
              <td>
                <S.Blue>
                  <p>{item.Actives}</p>
                </S.Blue>
              </td>
              <td>
                <S.Red>
                  <p>{item.HRD}</p>
                </S.Red>
              </td>
              <td>
                <S.Orange>
                  <p>{(+item.Results * 100).toFixed(2)} %</p>
                </S.Orange>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
      {/* <S.DButton onClick={handleDownload}>Download</S.DButton> */}
    </>
  );
};
