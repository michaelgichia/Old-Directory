import styled from 'styled-components';
import { Button } from 'antd';


export const TabsWrap = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export const EventBtn = styled(Button)`
  width: 100%;

  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.02);
  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1),
    0 2px 10px 0 rgba(0, 0, 0, 0.02);

  @media (min-width: 768px) {
    font-size: 13px !important;
    height: 36px !important;
  }

  @media (max-width: 768px) {
   height: 45px !important;
  }

  @media (max-width: 992px) {
    margin-bottom: 32px;
  }

  &:hover {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.05);
  }
`;

export const H5Error = styled.h5`
  width: 100%;
  padding: 16px;
  color: #f81d22;
`