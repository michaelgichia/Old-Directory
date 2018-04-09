import { Input } from 'antd';
import styled from 'styled-components';

const EventInput = styled(Input)`
  @media (min-width: 768px) {
    height: 36px;
  }

  @media (max-width: 768px) {
    max-height: 45px;
    min-height: 45px;
  }
`;
export default EventInput;
