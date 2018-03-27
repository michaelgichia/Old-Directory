import styled from 'styled-components';

const DescHeader = styled.div`
  background-color: #31383e;
  color: #f6f3ee;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (max-width: 567px) {
    padding-left: 16px;
    padding-top: 16px;
  }

  & > h5 {
    color: #f6f3ee;
    line-height: 20px;
    font-size: 14px;
    font-weight: 700;
    width: calc(100% - 70px);
  }

  & a:hover {
    text-decoration: underline;
  }

  & i {
    text-decoration: none;
    font-size: 16px;
    width: 24px;
  }
`;
export default DescHeader;
