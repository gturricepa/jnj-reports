import styled from "styled-components";
import { paleteColors } from "../../../styles/theme";

export const Table = styled.table`
  width: 100%;
  border-radius: 5px;
  border-collapse: collapse;
  max-height: 27rem;
  margin-top: 1rem;
  thead {
    /* background-color: #ee1100; */
    background-color: ${paleteColors[0]};
    color: white;
    font-size: 14px;

    th {
      cursor: pointer;
      font-size: 13px;
      padding: 8px;
      font-weight: bold;
      text-align: center;
      border-radius: 5px;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 70px; /* ajuste conforme necessário */
    }
  }

  tbody {
    padding: 0;
    margin: 0;
    tr {
      transition: background-color 0.2s;
      padding: 0;
      margin: 0;
    }

    tr:hover {
      background-color: #e4dcdc4e;
    }

    tr:nth-child(odd) {
      background-color: #f9f9f9;
    }

    tr:nth-child(even) {
      background-color: #ffffff;
    }

    td {
      text-align: center;
      font-size: 13px;
      padding: 0;
      margin: 0;
      padding: 0.8rem;
      justify-content: center;
      align-items: c;
    }
  }
`;
export const PaginationButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  margin-bottom: 2rem;
  /* background-color: #ff0000; */
  background-color: ${paleteColors[1]};

  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    /* background-color: #b30000; */
    background-color: ${paleteColors[0]};
  }

  &:disabled {
    /* background-color: #ab1818; */
    background-color: ${paleteColors[0]};

    cursor: not-allowed;
  }
`;
export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const TableControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 0;
`;

export const PageInfo = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;
export const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 99%;
  margin-left: 0.5rem;
  box-sizing: border-box;
  margin-top: 1rem;
`;
