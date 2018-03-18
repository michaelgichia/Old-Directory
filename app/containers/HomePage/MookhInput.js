import { Input } from 'antd';
import styled from 'styled-components'

const MookhInput = styled(Input)`
  & > input {
    border: 1px solid #e6e1e1;
    color: #ffffff;

    ::-webkit-input-placeholder {
      color: white;
      font-weight: 500;
    }
    ::-moz-placeholder {
      color: white;
      font-weight: 500;
    }
    :-ms-input-placeholder {
      color: white;
      font-weight: 500;
    }
    :-moz-placeholder {
      color: white;
      font-weight: 500;
    }
  }
`

export default MookhInput;
