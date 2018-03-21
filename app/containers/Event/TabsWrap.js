import styled from 'styled-components';

const TabsWrap = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;
export default TabsWrap;
