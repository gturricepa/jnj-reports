import styled from "styled-components";
import { paleteColors } from "../../styles/theme";

export const Holder = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    padding: 0.5rem;
    /* background-color: #ee1100; */
    background-color: ${paleteColors[2]};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 7rem;

    &:hover {
      /* background-color: #b10000; */
      background-color: ${paleteColors[0]};
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

export const PizzaChart = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
