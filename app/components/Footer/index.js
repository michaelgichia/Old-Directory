/**
*
* Footer
*
* The for of the website.
*/

import React from 'react';
import './footer.css';

class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <div className="copyright-wrap">
          <p>copyright © mookh 2016</p>
        </div>
        <div className="footer-links">
          <a href="#">FAQ</a>
          <a href="mailto:hello@mymookh.com">Support</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="social-media-wrap">
          <a href="#">
            <span className="fa-stack fa-lg">
              <i className="fa fa-twitter fa-stack-1x fa-inverse" />
            </span>
          </a>
          <a href="#">
            <span className="fa-stack fa-lg">
              <i className="fa fa-facebook fa-stack-1x fa-inverse" />
            </span>
          </a>
          <a href="#">
            <span className="fa-stack fa-lg">
              <i className="fa fa-instagram fa-stack-1x fa-inverse" />
            </span>
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
