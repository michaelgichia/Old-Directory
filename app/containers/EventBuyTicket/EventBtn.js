import { Button } from 'antd';
import styled from 'styled-components';

const EventBtn = styled(Button)`
  font-size: 13px !important;
  height: 36px;
  width: 100%;

  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.02);
  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1),
    0 2px 10px 0 rgba(0, 0, 0, 0.02);

  @media (max-width: 992px) {
    margin-bottom: 16px;
    height: 40px !important;
    font-size: 14px !important;
  }

  &:hover {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.05);
  }
`;
export default EventBtn;
