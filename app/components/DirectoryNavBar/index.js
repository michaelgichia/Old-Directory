/**
*
* DirectoryNavBar
*
*/

import React from "react";
import { Icon } from "semantic-ui-react";
import { getPathname } from "utils/helperFunctions";
import "!!style-loader!css-loader!./directory-nav-bar.css";

class DirectoryNavBar extends React.PureComponent {
  render() {
    const { pathname } = this.props;
    const location = getPathname(pathname);
    return (
      <ul className="directory-navbar">
        <li>
          <a href="#" />
        </li>
        <li className={location === "landing page" ? "dnb-active" : ""}>
          <a href="#">
            <Icon name="star" />
            <span className="nav-item-name">Featured</span>
            <span />
          </a>
        </li>
        <li>
          <a href="/buy-ticket">
            <Icon name="ticket" />
            <span className="nav-item-name">Tickets</span>
            <span />
          </a>
        </li>
        <li>
          <a href="/event-information">
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
