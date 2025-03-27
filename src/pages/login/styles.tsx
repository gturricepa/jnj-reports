// src/styles.ts
import { paleteColors } from "../../styles/theme";
import styled from "styled-components";
export const Holder = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const LeftPanel = styled.div`
  width: 30%;
  /* background-color: #ee1100; */
  background-color: #bd1c00;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* background-color: white; */
  backdrop-filter: blur(2px);
  border-radius: 15px;
  /* background: rgba(255, 255, 255, 0.5); */

  h1 {
    font-size: 4rem;
    /* color: #322d2d;
     */
    color: ${paleteColors[0]};
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }
  h2 {
    font-size: 3rem;
    font-weight: 100;
    /* color: #ee1100;
     */
    color: #bd1c00;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;
