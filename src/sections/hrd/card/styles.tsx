import styled from "styled-components";

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  width: 12rem;
  height: 6rem;
  border: 2px solid black;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  background-color: #ffffff;

  p {
    font-weight: bold;
    font-size: 2rem;
    padding: 0;
    margin: 0;
  }
  span {
    font-size: 0.8rem;
  }
`;
