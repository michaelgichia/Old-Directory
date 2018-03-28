import styled from 'styled-components';
import { Col } from 'antd';

export default styled(Col)`
  margin-bottom: 50px;
  padding: 0 10px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    padding: 0 !important;
  }
`;
