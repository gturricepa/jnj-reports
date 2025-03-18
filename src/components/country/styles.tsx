import styled from "styled-components";

export const Holder = styled.div`
  display: flex;
  margin-right: 1rem;
  .ant-select-selection-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      img {
        margin-right: 5px;
      }
      .anticon,
      .anticon-close {
        width: 2rem;
        margin: 0;
      }
    }
  }
  img {
  }
  svg {
    width: 0.8rem;
    display: flex;
  }
`;
