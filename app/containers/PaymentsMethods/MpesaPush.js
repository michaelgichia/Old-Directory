/*
 *
 * MpesaPush
 *
 */

import React, { PureComponent } from "react";
import MpesaPushImage from "./MpesaPushImage.png";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import { PaymentButtons } from "components/Buttons";

import "!!style-loader!css-loader!./mpesa-push.css";

export class MpesaPush extends PureComponent {
  render() {
    return (
      <div>
        <TabsBodyWrap>
          <div className="mpesa-push-wrap">
            <div>
              <p>Follow these instructions to complete transaction</p>
              <p>
                Check your phone and follow the instructions on your screen.
              </p>
              <p>
                If nothing appears in the next 10 seconds,<a
                  href="#"
                  onClick={this.props.onClick}
                >
                  click here
                </a>
              </p>
            </div>
            <div>
              <img src={MpesaPushImage} alt="" />
            </div>
          </div>
        </TabsBodyWrap>
        <TabsBodyWrap>
          <div>
            <PaymentButtons
              id="store"
              bsKlass="secondary shadow"
              label="PREVIOUS"
            />
          </div>
        </TabsBodyWrap>
      </div>
    );
  }
}

export default MpesaPush;
