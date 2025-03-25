import styled, { keyframes } from "styled-components";
import { paleteColors } from "../../styles/theme";
const appearAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Holder = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${appearAnimation} 0.3s ease-out;

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
    margin-top: 2rem;

    &:hover {
      /* background-color: #b10000; */
      background-color: ${paleteColors[0]};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const Divsion = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
export const Filters = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;
