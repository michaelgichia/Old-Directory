import styled from 'styled-components';

const MottoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;

  @media (min-width: 576px) {
    flex-basis: 450px;
  }

  @media (max-width: 576px) {
    max-width:100%;
    margin-bottom: 40px;
  }
`
export default MottoWrap;