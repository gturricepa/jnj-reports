import styled from "styled-components";

export const CardHolder = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  box-sizing: border-box;
  padding: 1rem;
`;

export const ListHolder = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: start;

    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    font-weight: 300;
  }
  li {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    justify-self: flex-start;
  }
  span {
    margin: 0;
    width: 100%;
    padding: 0;
  }
`;

export const ValueHolder = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  span {
    margin: 0;
    width: 10rem;
    padding: 0;
    border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;
