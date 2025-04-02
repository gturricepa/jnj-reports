import styled from "styled-components";
// import { paleteColors } from "../../styles/theme";

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid gray;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  width: 12rem;
  padding: 0.3rem;
  background-color: #ffffff;
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
  height: 5rem;

  &:hover {
    box-shadow: 0 2px px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
    cursor: pointer;
  }
`;

export const Main = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  justify-self: center;
  align-self: center;
  width: 100%;
`;
export const Icon = styled.span`
  display: flex;
  align-self: center;
  font-size: 1.2rem;
  display: flex;
  margin: 0;
  padding: 0;

  width: 100%;
`;
export const Text = styled.div`
  display: flex;
  font-size: 0.8rem;
  justify-self: center;
  align-self: center;
  /* font-weight: bold; */
  justify-content: center;
  width: calc(100% - 2.7rem);
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  height: 6rem;
  flex-wrap: wrap;
`;
