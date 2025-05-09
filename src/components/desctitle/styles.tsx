import styled from "styled-components";
import { chartPalete } from "../../styles/theme";
export const Title = styled.h2`
  display: flex;
  width: 99%;
  font-weight: 400;
  /* border-bottom: 1px solid ${(props) => props.theme.colors.red}; */
  /* color: ${(props) => props.theme.colors.red}; */
  color: ${chartPalete[0]};
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  font-weight: 600;
  box-sizing: border-box;
  font-size: 1.2rem;
`;
