/**
*
* Footer
*
* The for of the website.
*/

import React from "react";
import "!!style-loader!css-loader!./footer.css";

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
            <Icon name="twitter" circular />
          </a>
          <a href="#">
            <Icon name="facebook f" circular />
          </a>
          <a href="#">
            <Icon name="instagram" circular />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
