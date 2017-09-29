/**
*
* DirectoryNavBar
*
*/

import React from "react";
import { Icon } from 'semantic-ui-react';
import "!!style-loader!css-loader!./directory-nav-bar.css";

class DirectoryNavBar extends React.PureComponent {
  render() {
    return (
      <ul className="directory-navbar">
        <li>
          <a href="" />
        </li>
        <li>
          <a href="#">
            <Icon name="star" />
            <span className="nav-item-name">Featured</span>
            <span />
          </a>
        </li>
        <li>
          <a href="#">
            <Icon name="ticket" />
            <span className="nav-item-name">Tickets</span>
            <span />
          </a>
        </li>
        <li>
          <a href="#">
            <Icon name="shopping basket" />
            <span className="nav-item-name">Products</span>
            <span />
          </a>
        </li>
        <li>
          <a href="#">
            <Icon name="headphone" />
            <span className="nav-item-name">Digital Content</span>
            <span />
          </a>
        </li>
        <li>
          <a href="" />
        </li>
      </ul>
    );
  }
}

DirectoryNavBar.propTypes = {};

export default DirectoryNavBar;
