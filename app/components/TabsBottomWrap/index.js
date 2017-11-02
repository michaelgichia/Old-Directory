import React, { PureComponent } from 'react';
import "!!style-loader!css-loader!./tabs-bottom-wrap.css";


export default class TabsBottomWrap extends PureComponent {
  render() {
    return (
      <div className="mookh-btn-wrap">
        {this.props.children}
      </div>
    );
  }
}
