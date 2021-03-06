/*
 *
 * MookhInputWithBtn
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './mookh-inputwith-btn.css';

export default class MookhInputWithBtn extends PureComponent {
  render() {
    const {
      id,
      type,
      value,
      onBlur,
      required,
      onChange,
      wrapClass,
      labelName,
      inputError,
      placeholder
    } = this.props;
    return (
      <div className={`mookh-input2-wrap ${wrapClass}`}>
        <label className="mookh-label2" htmlFor="fname">{labelName}</label>
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          onBlur={onBlur}
          onChange={onChange}
          className="mookh-input2"
          placeholder={placeholder}
          name={labelName.toLowerCase()}
        />
        <button className="mookh-input2-generate">GENERATE</button>
        <span className="mookh-span-error">{inputError}</span>
      </div>
    );
  }
}

MookhInputWithBtn.propTypes = {
  labelName: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  wrapClass: PropTypes.string,
  inputError: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  required: PropTypes.bool.isRequired
};
