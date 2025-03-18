import styled from "styled-components";

export const Holder = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  span {
    font-weight: bold;
  }
  svg {
    font-size: 1.4rem;
  }

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
`;
