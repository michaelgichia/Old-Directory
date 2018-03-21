import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PaymentButtons } from 'components/Buttons';
import TabsBottomWrap from 'components/TabsBottomWrap';
import TabsBodyWrap from 'components/TabsBodyWrap';
import GooglePlayBadge from './images/google.png';
import AppleBadge from './images/apple.png';
import './css/product-confirmation.css';


export class PaymentConfirmation extends PureComponent {
  render() {
    return (
      <div>
        <TabsBodyWrap>
          <div className="confirmation-wrap">
            <header>
              <span>
                PAYMENT SUCCESSFUL
                <svg
                  enableBackground="new 0 0 512 512"
                  version="1.1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M208,416L102,278l47-49l59,75   l185-151l23,23L208,416z"
                    fill="#31D34C"
                  />
                </svg>
              </span>
              <p>Your order has been completed</p>
              <p>Check your email for the items you have bought and receipt</p>
              <p>For inquiries contact us: hello@mymookh.com</p>
            </header>
            <div className="apps-wrap">
              <p>Check out our App to keep track of your downloads and more.</p>
              <div className="app-stores-wrap">
                <a className="play-store" href="#">
                  <img src={GooglePlayBadge} alt="play store badge" />
                </a>
                <a className="play-store" href="#">
                  <img src={AppleBadge} alt="app store badge" />
                </a>
              </div>
            </div>
            <div className="feedback-wrap">
              <p>powered by MOOKHPAY.</p>
              <PaymentButtons
                id="store"
                bsKlass="secondary shadow"
                label="Give us feedback"
              />
            </div>
          </div>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <div>
            <PaymentButtons
              id="nextOne"
              bsKlass="primary shadow"
              label="CONTINUE SHOPPING"
              onClick={this.props.handleCloseModal}
            />
          </div>
        </TabsBottomWrap>
      </div>
    );
  }
}

PaymentConfirmation.proptypes = {
  handleCloseModal: PropTypes.func.isRequired
};

export default PaymentConfirmation;
