/*
 *
 * MpesaPush
 *
 */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import MpesaPushImage from "./MpesaPushImage.png";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import { PaymentButtons, BackButton } from "components/Buttons";
import { InputConstants } from "utils/constants";

import "!!style-loader!css-loader!./mpesa-push.css";

export class MpesaPush extends PureComponent {
  state = {
    customerErrors: {
      phone_numberError: ""
    }
  };

  onBlur = (e, name) => {
    e.persist();
    const { customerErrors } = this.state;
    const { value } = e.target;
    const requiredFields = ["phone_number"];

    if (requiredFields.indexOf(name) > -1 && value.length < 1) {
      this.setState(() => ({
        customerErrors: {
          ...customerErrors,
          [`${name}Error`]: "You can't leave this empty."
        }
      }));
    } else {
      this.setState(() => ({
        customerErrors: InputConstants[name]["regex"].test(value)
          ? { ...customerErrors, [`${name}Error`]: "" }
          : {
              ...customerErrors,
              [`${name}Error`]: InputConstants[name].error
            }
      }));
    }
  };

  render() {
    const error = "";
    const inputClassnames = classNames({ "ebt-input-error": error });
    const { customer: { phone_number } } = this.props;
    const { customerErrors: { phone_numberError } } = this.state;
    return (
      <div>
        <TabsBodyWrap>
          <div className="ebt-phone-no-edit">
            <div className="mpesa-push-input">
              <label htmlFor="phone_number"> Confirm Mpesa No:</label>
              <div className="ebt-div-information">
                <input
                  style={{ padding: "4px 14px" }}
                  className={inputClassnames}
                  onChange={() => ({})}
                  id="phone_number"
                  defaultValue={phone_number}
                  type="tel"
                  placeholder="Phone number"
                  required
                  onBlur={e => this.onBlur(e, "phone_number")}
                />
                <span>{phone_numberError}</span>
              </div>
            </div>
            <div className="ebt-order-total">AMOUNT KES {this.props.totalTicketsPrice}</div>
          </div>
          <div className="mpesa-push-wrap">
            <div className="mpesa-push-div1">
              <p />
              <p className="go-to-paybill-p1">
                Click PAY NOW and check your phone and follow the instructions
                on your screen.
              </p>

              {this.props.mpesaInitiated ? (
                <section className="mpesa-push-loader-wrap">
                  <div className="mpesa-spinner" />
                </section>
              ) : (
                <div style={{minHeight: 20}}/>
              )}

              <div className="primary-pay-mpesa">
                <PaymentButtons
                  id="pay"
                  bsKlass="primary ripple"
                  label="PAY NOW"
                  onClick={this.props.handlePayment}
                />
              </div>
              {this.props.mpesaInitiated ? (
                <p className="go-to-paybill-p2">
                  Did not see prompt on your phone? To pay manually via Paybill, <a onClick={this.props.goToPayBill}>click here</a>
                </p>
              ) : (
                <p />
              )}
            </div>
            <div className="mpesa-push-div2">
              <img src={MpesaPushImage} alt="" />
            </div>
          </div>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <PaymentButtons
            id="store"
            bsKlass="secondary ripple"
            label="RETURN TO STORE"
            onClick={this.props.handleReturnToStore}
          />
        </TabsBottomWrap>
      </div>
    );
  }
}

MpesaPush.proptypes = {
  mpesaInitiated: React.PropTypes.bool.isRequired,
  goToPayBill: React.PropTypes.func.isRequired
};

const mapStateToProps = ({ payments }) => ({
  customer: payments.customer
});

export default connect(mapStateToProps, null)(MpesaPush);