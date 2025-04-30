import styled from "styled-components";
import { chartPalete } from "../../styles/theme";

export const Holder = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: #ee1100; */
  background-color: ${chartPalete[0]};
  margin-top: 3rem;
  height: 5rem;
  color: white;
`;
