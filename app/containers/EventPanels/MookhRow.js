import styled from 'styled-components';
import { Row } from 'antd';

export default styled(Row)`
  max-width: 1100px;
  width: 100%;
  border: 1px solid red;

  @media (max-width: 992px) {
    max-width: 660px;
  }

  @media (max-width: 576px) {
    max-width: 400px;
  }
`;
