import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './payment-checkbox.css';

export default class PaymentCheckbox extends PureComponent {
  render() {
    const { id, onChange, placeholder, wrapKlass, defaultChecked, disabled } = this.props;
    return (
      <div className={`pc-wrap ${wrapKlass}`}>
        <input
          id={id}
          type="checkbox"
          onChange={onChange}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
        <label htmlFor={id}>
          <span>{placeholder}</span>
          <span className="pc-svg">
            <svg
              enableBackground="new 0 0 512 512"
              version="1.1"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M208,416L102,278l47-49l59,75   l185-151l23,23L208,416z"
                fill="#faea29"
              />
            </svg>
          </span>
        </label>
      </div>
    );
  }
}

PaymentCheckbox.proptypes = {
  onChange: PropTypes.func,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  defaultChecked: PropTypes.bool
};
