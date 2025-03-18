import styled from "styled-components";

export const Menu = styled.header`
  display: flex;
  color: ${(props) => props.theme.colors.red};
  width: 100%;
  justify-content: space-around;
  align-items: center;
  height: 4rem;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fcfafa;
  z-index: 100;
  p {
    color: black;
  }
  h4 {
    /* border-bottom: 1px solid white; */
    border: 1px solid ${(props) => props.theme.colors.red};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem 1rem 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.colors.red};
      color: white;
    }
  }

  svg {
    font-size: 1.5rem;
    margin-left: 1.5rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
