import styled from "styled-components";
import { chartPalete, redPalete } from "../../../styles/theme";
export const Table = styled.table`
  width: 100%;
  border-radius: 5px;
  border-collapse: collapse;
  margin-top: 3rem;
  margin-bottom: 3rem;

  thead {
    /* background-color: #ee1100; */
    background-color: ${chartPalete[0]};

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

export const PaginationButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  /* background-color: #ff0000; */
  background-color: ${chartPalete[0]};

  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    /* background-color: #b30000; */
    background-color: ${chartPalete[1]};
  }

  &:disabled {
    /* background-color: #ab1818; */
    background-color: ${chartPalete[1]};

    cursor: not-allowed;
  }
`;

export const Red = styled.div`
  display: flex;
  justify-self: center;
  background-color: #ff00112b;
  border: 1px solid ${redPalete[2]};
  border-radius: 5px;
  color: ${redPalete[2]};
  width: 30%;
  justify-content: center;
  p {
    margin: 0;
  }
`;
export const Orange = styled.div`
  display: flex;
  justify-self: center;
  background-color: #8c3bbb17;
  border: 1px solid #8c3bbb;
  border-radius: 5px;
  color: #8c3bbb;
  width: 30%;
  justify-content: center;
  p {
    margin: 0;
  }
`;
export const Blue = styled.div`
  display: flex;
  justify-self: center;
  background-color: #5988c233;
  border: 1px solid ${chartPalete[0]};
  border-radius: 5px;
  color: ${chartPalete[0]};
  width: 30%;
  justify-content: center;
  p {
    margin: 0;
  }
`;
