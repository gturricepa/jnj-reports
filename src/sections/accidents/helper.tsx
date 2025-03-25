import { AccidentData } from "../../types/Accident";

const transformExcelDate = (excelDate: number): Date => {
  const utcDate = (excelDate - 25569) * 86400 * 1000;
  return new Date(utcDate);
};

export const separeByYear = (
  data: AccidentData[]
): Record<string, AccidentData[]> => {
  const groupedData: Record<string, AccidentData[]> = {};

  const currentYear = new Date().getUTCFullYear();
  const previousYear = currentYear - 1;

  groupedData[currentYear.toString()] = [];
  groupedData[previousYear.toString()] = [];

  data.forEach((item) => {
    const excelDate = +item.Date;
    if (isNaN(excelDate)) {
      console.error("Data inválida:", item.Date);
      return;
    }

    const date = transformExcelDate(excelDate);
    const year = date.getUTCFullYear().toString();

    if (year === currentYear.toString() || year === previousYear.toString()) {
      groupedData[year].push(item);
    }
  });

  return groupedData;
};
