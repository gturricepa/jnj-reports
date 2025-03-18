import styled from "styled-components";

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 8rem;
  border: 2px solid black;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  background-color: white;

  p {
    font-weight: bold;
    font-size: 3rem;
    padding: 0;
    margin: 0;
  }
  span {
    font-size: 0.8rem;
  }
`;
