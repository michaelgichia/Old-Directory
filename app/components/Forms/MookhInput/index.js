import React from 'react';
import PropTypes from "prop-types";
import "!!!style-loader!css-loader!./mookh-input.css";

export default class MookhInput extends React.PureComponent {
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
      placeholder,
    } = this.props;
    return(
      <div className={wrapClass}>
        <label className="mookh-label" htmlFor="fname">{labelName}</label>
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          onBlur={onBlur}
          onChange={onChange}
          className="mookh-input"
          placeholder={placeholder}
          name={labelName.toLowerCase()}
        />
        <span className="mookh-span-error">{inputError}</span>
      </div>
    );
  }
}

MookhInput.propTypes = {
  labelName: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  wrapClass: PropTypes.string,
  inputError: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func.isRequired,
  value: React.PropTypes.any.isRequired,
  required: React.PropTypes.bool.isRequired
}