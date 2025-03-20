import styled from "styled-components";
import { paleteColors } from "../../styles/theme";

export const Holder = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: #ee1100; */
  background-color: ${paleteColors[0]};

  height: 5rem;
  color: white;
`;
