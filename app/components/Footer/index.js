/**
*
* Footer
*
*/

import React from 'react';
import { Icon } from 'semantic-ui-react';
import '!!style-loader!css-loader!./footer.css';

class Footer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <footer>
        <div className="copyright-wrap">
          <p>copyright © mookh 2016</p>
        </div>
        <div className="footer-links">
          <a href="https://mymookh.com/directory/category/tickets/faqs.html">FAQ</a>
          <a href="mailto:hello@mymookh.com">Support</a>
          <a href="https://mymookh.com/directory/category/tickets/privacy.html">Privacy Policy</a>
          <a href="https://mymookh.com/directory/category/tickets/terms.html">Terms of Service</a>
        </div>
        <div className="social-media-wrap">
          <a href=""><Icon name="twitter" circular /></a>
          <a href=""><Icon name="facebook f" circular /></a>
          <a href=""><Icon name="instagram" circular /></a>
        </div>
      </footer>
    );
  }
}

export default Footer;
