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
      padding: 8px;
      font-weight: bold;
      text-align: center;
      border-radius: 5px;
    }
  }

  tbody {
    padding: 0;
    margin: 0;
    tr {
      transition: background-color 0.2s;
      padding: 0;
      margin: 0;
      padding: 1rem;
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

      padding: 1rem;
    }
  }
`;
