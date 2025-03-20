import styled from "styled-components";
import { paleteColors } from "../../../styles/theme";
export const Table = styled.table`
  width: 40rem;
  border-radius: 5px;
  border-collapse: collapse;
  thead {
    /* background-color: #ee1100; */
    background-color: ${paleteColors[0]};
    color: white;
    font-size: 14px;

    th {
      padding: 10px;
      font-weight: bold;
      text-align: center;
      border-radius: 5px;
    }
  }

  tbody {
    tr {
      transition: background-color 0.2s;
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
      padding: 8px;
      text-align: center;
      font-size: 14px;
    }
  }
`;
