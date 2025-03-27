import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 10rem;
  width: 40rem;
  padding: 1rem;
  border-radius: 8px;

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      outline: none;
      /* border-color: #ee1100; */
      border-color: #bd1c00;
    }
  }

  button {
    padding: 0.5rem;
    /* background-color: #ee1100; */
    background-color: #bd1c00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1rem;

    &:hover {
      background-color: #b10000;
    }
  }
`;
