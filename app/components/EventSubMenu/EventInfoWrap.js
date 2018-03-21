import styled from 'styled-components';

const EventInfoWrap = styled.div`
  position: relative;
  display: block;
  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #faea29;
    color: #343a41;
    padding: 8px 0;

    @media (max-width: 576px) {
      padding: 8px 16px;
    }
    & > h3 {
      text-transform: uppercase;
      width: 100%;
      max-width: 992px;
      font-weight: 500;
    }

    @media (min-width: 990px) and (max-width: 1920px) {
      min-height: 40px;
      margin-top: 0;
    }

    @media (max-width: 768px) {
      min-height: 40px;
      margin-top: 0;
    }
  }
`;
export default EventInfoWrap;
