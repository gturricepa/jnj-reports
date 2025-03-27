import styled from "styled-components";
import { paleteColors } from "../../../styles/theme";
export const Holder = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  background-color: ${paleteColors[2]};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 7rem;
  height: 2rem;
  font-size: 1.4rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${paleteColors[0]};
  }
`;
