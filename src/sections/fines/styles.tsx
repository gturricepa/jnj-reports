import styled, { keyframes } from "styled-components";

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
  min-height: 35rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${appearAnimation} 0.3s ease-out;

  button {
    padding: 0.5rem;
    background-color: #ee1100;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 7rem;
    margin-top: 4rem;

    &:hover {
      background-color: #b10000;
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
