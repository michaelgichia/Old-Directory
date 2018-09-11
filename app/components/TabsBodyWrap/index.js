import React, { PureComponent } from 'react';
import './tabs-body-wrap.css';


export default class TabsBodyWrap extends PureComponent {
  render() {
    return (
      <div className="information-form">
        {this.props.children}
      </div>
    );
  }
}
