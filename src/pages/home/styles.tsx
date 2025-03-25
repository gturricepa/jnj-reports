import styled from "styled-components";
import { paleteColors } from "../../styles/theme";
export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  width: 99%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  section {
    width: 100%;
  }
`;

export const SelectCountry = styled.section`
  display: flex;
  width: 100%;
  height: calc(100vh - 9rem);
  justify-content: center;
  align-items: center;
  div {
    width: 25rem;
    height: 10rem;
    border: 1px dashed lightgrey;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 3rem;
      color: ${paleteColors[3]};
    }
  }
`;
