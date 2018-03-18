import styled from 'styled-components';

const SubWrap = styled.div`
  display: flex;
  max-width: 992px;

  @media (max-width: 992px) {
    max-width: 660px;
  }

  @media (min-width: 576px) {
    justify-content: space-between;
    margin-bottom: 45px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
  }
}

`;
export default SubWrap;
