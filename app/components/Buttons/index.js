import React from "react";
import PropTypes from "prop-types";
import "!!style-loader!css-loader!./button.css";

/*
 * Mookh Button
*/
export class PaymentButtons extends React.PureComponent {
  render() {
    const { id, bsKlass, label, onClick } = this.props;
    return (
      <button onClick={onClick} className={`mookh-btn mookh-btn-wd ${bsKlass}`} id={id}>
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
        <span> </span><span>{label}</span>
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

PaymentButtons.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  bsKlass: PropTypes.string,
  handleGlowBtn: PropTypes.func,
  onClick: React.PropTypes.func
};