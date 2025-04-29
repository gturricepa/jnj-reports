import { useTranslation } from "react-i18next";
// import { NoData } from "../../../components/nodata";
import { ComplianceData } from "../types";
import React, { useState } from "react";
import * as S from "./styles";
import Flag from "react-world-flags";
import { getCountryCode } from "../../../components/country/helper";
import { Tooltip } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { DownloadButton } from "../../../components/card/downloadButton";
import { downloadExcel } from "../../../helper/downloadExcel";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface TableData {
  data: ComplianceData[];
}

export const ComplianceTable: React.FC<TableData> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilters, setStatusFilters] = useState<string[]>([
    "Complete",
    "Incomplete",
  ]);
  const itemsPerPage = 14;
  const { t } = useTranslation();

  const { selectedCountry } = useSelector((state: RootState) => state.user);

  const handleCheckboxChange = (status: string) => {
    setCurrentPage(1);
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredData = data.filter((item) =>
    statusFilters.includes(item.Status)
  );

  //   if (filteredData.length === 0) {
  //     return <NoData />;
  //   }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return <S.Ellipsis key={`ellipsis-${index}`}>...</S.Ellipsis>;
      }

      return (
        <S.PaginationButton
          key={page}
          onClick={() => handlePageChange(page as number)}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </S.PaginationButton>
      );
    });
  };

  const allowedToShowLatamAssessment =
    Array.isArray(selectedCountry) &&
    selectedCountry.some(
      (country) => !["Canada", "United States of America"].includes(country)
    );

  const handleDownload = () => {
    const columnsToDownload = Object.keys(data[0]) as (keyof ComplianceData)[];

    downloadExcel(currentItems, columnsToDownload, "compliance.xlsx");
  };
  const language = useSelector((state: RootState) => state.language.language);

  const formatDate = (value: string, language: string) => {
    if (typeof value === "undefined") return;
    if (language === "en") return value;
    const parts = value.split("/");
    if (parts.length !== 3) return;
    const [mes, dia, ano] = parts;
    if (!mes || !dia || !ano) return;

    return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
  };

  return (
    <>
      <S.FilterBar>
        <label>
          <input
            type="checkbox"
            checked={statusFilters.includes("Complete")}
            onChange={() => handleCheckboxChange("Complete")}
          />
          Complete
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="checkbox"
            checked={statusFilters.includes("Incomplete")}
            onChange={() => handleCheckboxChange("Incomplete")}
          />
          Incomplete
        </label>
      </S.FilterBar>

      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <th>
                <Tooltip title={t("country")}>{t("country")}</Tooltip>
              </th>
              <th>
                <Tooltip title="Corporate ID">Corporate ID</Tooltip>
              </th>
              <th>
                <Tooltip title="Operating Group">Operating Group</Tooltip>
              </th>
              <th>
                <Tooltip title="Sector">Sector</Tooltip>
              </th>
              <th>
                <Tooltip title="Status">Status</Tooltip>
              </th>
              <th>
                <Tooltip title="Assigned date">Assigned date</Tooltip>
              </th>

              <th>
                <Tooltip title="Data Privacy Policy">
                  Data Privacy Policy
                </Tooltip>
              </th>
              {selectedCountry?.includes("Canada") && (
                <th>
                  <Tooltip title="Canadian / New Driver & Manager Orientation">
                    Canadian / New Driver & Manager Orientation
                  </Tooltip>
                </th>
              )}

              {selectedCountry?.includes("United States of America") && (
                <th>
                  <Tooltip title="MVR Release Form">MVR Release Form</Tooltip>
                </th>
              )}

              <th>
                <Tooltip title="SAFE FLEET Policy Acceptance">
                  SAFE FLEET Policy Acceptance
                </Tooltip>
              </th>
              <th>
                <Tooltip title="Pledge">Pledge</Tooltip>
              </th>
              {allowedToShowLatamAssessment && (
                <th>
                  <Tooltip title="Driver Assessment LATAM 2025">
                    Driver Assessment LATAM 2025
                  </Tooltip>
                </th>
              )}
              <th>
                <Tooltip title="Manager Pledge">Manager Pledge</Tooltip>
              </th>
              <th>
                <Tooltip title="Academy">Academy</Tooltip>
              </th>
              <th>
                <Tooltip title="Academy2">Academy2</Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <Flag
                    code={getCountryCode(item.Country)}
                    style={{ width: "20px", marginRight: "5px" }}
                    alt={item["Country"]}
                  />
                  {item["Country"]}
                </td>
                <td>{item["Corporate ID"]}</td>
                <td>{item["Operating Group"]}</td>
                <td>{item["Sector"]}</td>
                <td
                  style={{
                    display: "flex",
                    gap: ".3rem",
                    // width: "90%",
                    padding: ".3rem",
                    marginTop: ".5rem",
                    borderRadius: "5px",
                    backgroundColor:
                      item["Status"] === "Complete" ? "#198c3622" : "#8c191929",
                    color:
                      item["Status"] === "Complete" ? "#198c36" : "#8c1919",
                    border:
                      item["Status"] === "Complete"
                        ? "1px solid #198c36"
                        : " 1px solid#8c1919",
                  }}
                >
                  {item["Status"]}{" "}
                  {item["Status"] === "Complete" ? (
                    <CheckCircleOutlined
                      style={{ color: "#198c36", marginTop: ".25rem" }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{ color: "#8c1919", marginTop: ".25rem" }}
                    />
                  )}
                </td>
                <td>{formatDate(item["Assigned date"], language)}</td>
                <td>{formatDate(item["Data Privacy Policy"], language)}</td>

                {selectedCountry?.includes("Canada") && (
                  <td>
                    {formatDate(
                      item["Canadian / New Driver & Manager Orientation"],
                      language
                    )}
                  </td>
                )}

                {selectedCountry?.includes("United States of America") ? (
                  <td>{formatDate(item["MVR Release Form"], language)}</td>
                ) : null}

                <td>
                  {formatDate(item["SAFE FLEET Policy Acceptance"], language)}
                </td>
                <td>{formatDate(item["Pledge"], language)}</td>

                {allowedToShowLatamAssessment && (
                  <td>
                    {formatDate(item["Driver Assessment LATAM 2025"], language)}
                  </td>
                )}

                <td>{formatDate(item["Manager Pledge"], language)}</td>
                <td>{formatDate(item["Academy"], language)}</td>
                <td>{formatDate(item["Academy2"], language)}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>

        <S.PaginationContainer>
          <S.PaginationButton
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            &laquo;
          </S.PaginationButton>

          <S.PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt;
          </S.PaginationButton>

          {renderPageNumbers()}

          <S.PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &gt;
          </S.PaginationButton>

          <S.PaginationButton
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            &raquo;
          </S.PaginationButton>

          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              justifySelf: "center",
              alignSelf: "flex-start",
            }}
          >
            <p
              style={{
                display: "flex",
                justifyContent: "flex-end",
                border: "1px solid #092341",
                backgroundColor: "white",
                borderRadius: "5px",
                fontWeight: "bold",
                padding: ".35rem",
                paddingLeft: ".5rem",
                paddingRight: ".5rem",
                paddingBottom: ".5rem",
              }}
            >
              page: {currentPage}
            </p>
          </span>
        </S.PaginationContainer>
        {currentItems.length > 0 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              margin: 0,
            }}
          >
            <DownloadButton onClick={handleDownload} />
          </div>
        ) : null}
      </S.TableContainer>
    </>
  );
};
