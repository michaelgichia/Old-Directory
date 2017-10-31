import React from 'react';
import PropTypes from "prop-types";
import "!!style-loader!css-loader!./button.css";


/*
 * Ripple Effect Button
 */
export class PaymentButtons extends React.PureComponent {
  render() {
    const { id, bsKlass, label } = this.props;
    return(
      <button className={`mookh-btn ${bsKlass}`} id={id}>{label}</button>
    );
  }
}

PaymentButtons.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  bsKlass: PropTypes.string
}