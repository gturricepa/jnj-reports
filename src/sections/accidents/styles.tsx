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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${appearAnimation} 0.3s ease-out;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 1rem;
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
