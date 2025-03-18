import styled from "styled-components";

export const Title = styled.h2`
  display: flex;
  width: 100%;
  font-weight: 400;
  border-bottom: 1px solid ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.red};
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  padding-left: 0.8rem;
  padding-bottom: 0.3rem;
  font-weight: 600;
`;
