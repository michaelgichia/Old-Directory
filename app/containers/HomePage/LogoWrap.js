import styled from 'styled-components';

const LogoWrap = styled.div`
  text-align: center;
  @media (max-width: 768px) {
    height: 66px;
    padding: 8px 8px 0px 8px;
    width: 250px;
  }

  @media (max-width: 576px) {
    margin-bottom: 32px;
  }

  @media (min-width: 768px) {
    height: 120px;
    padding: 16px 16px 0px 16px;
    margin-bottom: 32px;
    height: 92px;
    width: 300px;
  }
`
export default LogoWrap;