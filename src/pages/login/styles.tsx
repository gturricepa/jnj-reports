// src/styles.ts
import styled from "styled-components";

export const Holder = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const LeftPanel = styled.div`
  width: 35%;
  background-color: #ee1100;
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
  h1 {
    font-size: 4rem;
    font-weight: 400;
    color: #322d2d;
  }
  h2 {
    font-size: 3rem;
    font-weight: 100;
    color: #ee1100;
  }
  h1,
  h2 {
    margin: 0;
    padding: 0;
  }
`;
