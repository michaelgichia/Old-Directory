import React, { PureComponent } from 'react';
import "./tabs-bottom-wrap.css";


export default class TabsBottomWrap extends PureComponent {
  render() {
    return (
      <div className="mookh-btn-wrap">
        {this.props.children}
      </div>
    );
  }
}
