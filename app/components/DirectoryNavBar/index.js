/**
*
* DirectoryNavBar
*
*/

import React from "react";
import { getPathname } from "utils/helperFunctions";
import "!!style-loader!css-loader!./directory-nav-bar.css";

class DirectoryNavBar extends React.PureComponent {
  render() {
    const { pathname, isFixedTopClass } = this.props;
    const location = getPathname(pathname);
    return (
      <ul className="directory-navbar" ref={this.props.navRef}>
        <li>
          <a href="#" />
        </li>
        <li className={location === "landing page" ? "dnb-active" : ""}>
          <a href="#">
            <i className="fa fa-star fa-2x" aria-hidden="true" />
            <span className="nav-item-name">Featured</span>
            <span />
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-ticket fa-2x" aria-hidden="true" />
            <span className="nav-item-name">Tickets</span>
            <span />
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-shopping-basket fa-2x" aria-hidden="true" />
            <span className="nav-item-name">Products</span>
            <span />
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-headphones fa-2x" aria-hidden="true" />
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
