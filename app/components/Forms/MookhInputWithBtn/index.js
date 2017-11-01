import React, { PureComponent } from 'react';
import "!!!style-loader!css-loader!./mookh-inputwith-btn.css";

export default class MookhInputWithBtn extends PureComponent {
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
      <div className={`mookh-input2-wrap ${wrapClass}`}>
        <label className="mookh-label2" htmlFor="fname">{labelName}</label>
        <input
          type={type}
          id={id}
          name={labelName.toLowerCase()}
          placeholder={placeholder}
          className="mookh-input2"
        />
        <button className="mookh-input2-generate">GENERATE</button>
        <span className="mookh-span-error">{inputError}</span>
      </div>
    );
  }
}
