import styled from 'styled-components';

const BtnWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 576px) {
    margin-top: 48px;
  }

  @media (max-width: 576px) {
    margin-top: 8px;
  }
`;
export default BtnWrap;
