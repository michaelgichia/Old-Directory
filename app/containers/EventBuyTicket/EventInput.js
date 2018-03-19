import { Input } from 'antd';
import styled from 'styled-components';

const EventInput = styled(Input)`
  max-height: 36px;
  min-height: 36px;
  @media (max-width: 992px) {
    height: 36px;
    font-size: 16px !important;
  }
`
export default EventInput;