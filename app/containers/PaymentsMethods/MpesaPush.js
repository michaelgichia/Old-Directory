import React, { PureComponent } from "react";
import MpesaPushImage from "./MpesaPushImage.png";
import "!!style-loader!css-loader!./mpesa-push.css";

export class MpesaPush extends PureComponent {
  render() {
    return (
      <div className="mpesa-push-wrap">
        <div>
          <p>Follow these instructions to complete transaction</p>
          <p>Check your phone and follow the instructions on your screen.</p>
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
    );
  }
}

export default MpesaPush;