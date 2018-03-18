import { Button } from "antd";
import styled from 'styled-components';

const EventBtn = styled(Button)`
  font-size: 13px !important;
  width: 100%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.05);

  @media (max-width: 992px) {
    margin-bottom: 16px;
    height: 40px !important;
    font-size: 14px !important;
  }
`
export default EventBtn;