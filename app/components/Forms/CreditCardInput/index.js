import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';

export class CreditCardInput extends Component {

  render() {
    const {
      id,
      type,
      value,
      onBlur,
      onFocus,
      pattern,
      required,
      onChange,
      wrapClass,
      labelName,
      readOnly,
      placeholder
    } = this.props;

    return (
      <div className={wrapClass}>
        <label className="mookh-label" htmlFor="fname">
          {labelName}
        </label>
        <input
          id={id}
          type={type}
          required={required}
          className="mookh-input mookh-input-active"
          placeholder={placeholder}
          pattern={pattern}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

CreditCardInput.propTypes = {
  labelName: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  wrapClass: PropTypes.string,
  // inputError: PropTypes.string,
  type: PropTypes.string.isRequired,
  // onBlur: PropTypes.func,
  value: PropTypes.any,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  // onFocus: PropTypes.func
};

export default CreditCardInput;

