import React from 'react';
import PropTypes from "prop-types";
import "!!!style-loader!css-loader!./mookh-input.css";

export default class MookhInput extends React.PureComponent {
  render() {
    const {
      labelName,
      id,
      placeholder,
      wrapClass,
      inputError,
      type
    } = this.props;
    return(
      <div className={wrapClass}>
        <label className="mookh-label" htmlFor="fname">{labelName}</label>
        <input
          type={type}
          id={id}
          name={labelName.toLowerCase()}
          placeholder={placeholder}
          className="mookh-input"
        />
        <span className="mookh-span-error">{inputError}</span>
      </div>
    );
  }
}

MookhInput.propTypes = {
  labelName: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  wrapClass: PropTypes.string,
  inputError: PropTypes.string,
  type: PropTypes.string
}