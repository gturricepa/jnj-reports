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
    background-color: ${paleteColors[1]};

    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 7rem;
    margin-top: 2rem;

    &:hover {
      /* background-color: #b10000; */
      background-color: ${paleteColors[0]};
    }
  }
`;
export const CardHolder = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  margin-top: 1rem;
  align-items: center;
  width: 100%;
`;
export const Filters = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 1rem;
`;

export const MapHolder = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-left: 3rem;
`;

export const Region = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Escope = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`;
