import React, { useState } from "react";
import { HRDData } from "../../../types/HRD";
import * as S from "./styles";
import { NoData } from "../../../components/nodata";
import { downloadExcel } from "../../../helper/downloadExcel";
import { getCountryCode } from "../../../components/country/helper";
import Flag from "react-world-flags";
// import * as XLSX from "xlsx";

interface TableHrdProps {
  data: HRDData[];
}

export const TableHrd: React.FC<TableHrdProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (data.length === 0) {
    return <NoData />;
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // const handleDownload = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

  //   XLSX.writeFile(workbook, "download.xlsx");
  // };

  const handleDownload = () => {
    const columnsToDownload: (keyof HRDData)[] = [
      "Country",
      "E-mail",
      "Corporate ID",
      "Operating Group",
      "Franchise",
      "Sector",
      "Type",
    ];
    downloadExcel(data, columnsToDownload, "hrd.xlsx");
  };

  return (
    <>
      <S.Table>
        <thead>
          <tr>
            {/* <th>First Name</th> */}
            {/* <th>Last Name</th> */}
            <th>Country</th>
            <th>Corporate ID</th>
            <th>Operating Group</th>
            <th>Franchise</th>
            <th>Sector</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {/* <td>{item["First Name"]}</td> */}
              {/* <td>{item["Last Name"]}</td> */}

              <td>
                <Flag
                  code={getCountryCode(item.Country)}
                  style={{ width: "20px", marginRight: "5px" }}
                />{" "}
                {item["Country"]}
              </td>
              <td>{item["Corporate ID"]}</td>
              <td>{item["Operating Group"]}</td>
              <td>{item["Franchise"]}</td>
              <td>{item["Sector"]}</td>
              <td>{item["Type"]}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <S.PaginationButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </S.PaginationButton>
        ))}
      </div>
      {data.length > 0 ? (
        <S.DButton onClick={handleDownload}>Download</S.DButton>
      ) : null}
    </>
  );
};
