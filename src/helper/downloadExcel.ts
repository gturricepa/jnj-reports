import * as XLSX from "xlsx";

export const downloadExcel = <T>(
  data: T[],
  columns: (keyof T)[],
  fileName: string
) => {
  const filteredData = data.map((item) => {
    const newItem: Partial<T> = {};
    columns.forEach((column) => {
      newItem[column] = item[column];
    });
    return newItem;
  });

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

  XLSX.writeFile(workbook, fileName);
};
