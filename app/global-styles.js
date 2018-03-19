import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }
  h1, h2, h3, h4, h5, h6, p { margin-bottom: 0px }
  h1 {
    font-size: 46px;
  }
  h2 {
    font-size: 32px;
  }
  h3 {
    font-size: 21px;
    font-family: 'Roboto', sans-serif;
  }
  h4 {
    font-size: 18px;
    font-weight: 400;
  }
  h5 {
    font-size: 16px;
    font-weight: 400;
  }
  h6 {
    font-size: 14px;
    font-weight: 400;
  }
  ul {
    padding: 0;
  }
  .ant-btn-dashed {
    border-color: transparent !important;
    border-style: solid !important;
  }
  .ant-btn-dashed:hover,
  .ant-btn-dashed:focus {
    border: 1px solid #faea29 !important;
  }
  .ant-input {
    border-radius: 1px !important;
  }
  .ant-tabs-nav-container {
    background-color: #f6f3ee;
  }
  .ant-tabs-ink-bar {
    background-color: #faea29;
    height: 3px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    font-weight: 500;
    color: #b3afaf;
  }
  .ant-tabs-nav .ant-tabs-tab:hover,
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #31383e;
  }

  .ant-select-selection {
    border: 1px solid #ccc;
    border-right: none;
  }

  @media screen and (max-width: 768px) {
    .ant-input-group-lg .ant-select-selection--single {
      height: 45px !important;
      display: flex;
      align-items: center;
    }
  }

`;



