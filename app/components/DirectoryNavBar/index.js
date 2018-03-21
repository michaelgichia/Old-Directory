/**
 *
 * DirectoryNavBar
 *
 */

import React from 'react';
import { getPathname } from 'utils/helperFunctions';
import './styles.css';

class DirectoryNavBar extends React.PureComponent {
  render() {
    const { pathname } = this.props;
    const location = getPathname(pathname);
    return (
      <div className="dir-nav-wrap">
        <ul className="directory-navbar">
          <li>
            <a href="#" />
          </li>
          <li className={location === 'landing page' ? 'dnb-active' : ''}>
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
      </div>
    );
  }
}

DirectoryNavBar.propTypes = {};

export default DirectoryNavBar;
