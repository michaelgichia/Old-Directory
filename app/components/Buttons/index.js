import React from "react";
import PropTypes from "prop-types";
import "./button.css";
import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  border: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 24px;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  
  @media (min-width: 768px) {
    width: 180px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 12px;
  }
`

const PaymentButtonSecondary = Button.extend`
  border-color: #FAEA29;
  color: #31383E;
  background-color: #ffffff;
  border: 1px solid #807d7d;
  color: #343434;
  border-radius: 4px;

  &:hover {
    background-color: #f6f3ee;
    color: black;
  }

  &:active {
    background-color: #b3afaf;
  }
`
const PaymentButtonPrimary = Button.extend`
  background-color: #faea29;
  border: 1px solid #faea29;
  color: #343434;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.05);
`

const PaymentButtonRipples = styled(PaymentButtonPrimary)`
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  &::after {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.5s, opacity 1s;
  }

`

/*
 * Mookh Button
*/
export class PaymentButtons extends React.PureComponent {
  render() {
    const { id, bsKlass, label, onClick } = this.props;
    return (
      <button
        onClick={onClick}
        className={`mookh-btn mookh-btn-wd ${bsKlass}`}
        id={id}
      >
        {label}
      </button>
    );
  }
}

/*
 * Back Button
*/
export class BackButton extends React.PureComponent {
  render() {
    const { id, bsKlass, label, onClick } = this.props;
    return (
      <button
        className={`mookh-btn back-btn ${bsKlass}`}
        id={id}
        style={{ verticalAlign: "middle" }}
        onClick={onClick}
      >
        <span> </span>
        <span>{label}</span>
      </button>
    );
  }
}

/*
 * Glowing Button
*/
export class GlowButton extends React.PureComponent {
  render() {
    return (
      <div className="glow-wrap">
        <div className="btn-glow-wrap" />
        <button className="button-glow" onClick={this.props.handleGlowBtn}>
          <svg viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </button>
      </div>
    );
  }
}

export default GlowButton;

PaymentButtons.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  bsKlass: PropTypes.string,
  handleGlowBtn: PropTypes.func,
  onClick: PropTypes.func
};

export {
  PaymentButtonSecondary,
  PaymentButtonPrimary,
  PaymentButtonRipples
}