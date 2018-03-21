import { Input } from 'antd';
import styled from 'styled-components';

const EventInput = styled(Input)`
  @media (max-width: 992px) {
    height: 36px;
    font-size: 16px !important;
  }

  @media (min-width: 768px) {
    max-height: 36px;
    min-height: 36px;
  }

  @media (max-width: 768px) {
    max-height: 45px;
    min-height: 45px;
  }
`;
export default EventInput;
