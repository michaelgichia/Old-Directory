import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./mookh-input.css";

export default class MookhInput extends React.PureComponent {

  // checkForError = error => error.length > 0;

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
      placeholder
    } = this.props;

    // const inputClassname = classNames("mookh-input", {
    //   "mookh-input-active": !this.checkForError(inputError),
    //   "mookh-input-error": this.checkForError(inputError)
    // });

    return (
      <div className={wrapClass}>
        <label className="mookh-label" htmlFor="fname">
          {labelName}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onBlur={onBlur}
          required={required}
          onChange={onChange}
          className="mookh-input mookh-input-active"
          placeholder={placeholder}
          name={id}
          pattern={pattern}
          onFocus={onFocus}
        />
      </div>
    );
  }
}

MookhInput.propTypes = {
  labelName: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  wrapClass: PropTypes.string,
  // inputError: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  onFocus: PropTypes.func
};