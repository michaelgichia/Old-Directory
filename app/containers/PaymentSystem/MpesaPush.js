/*
 *
 * MpesaPush
 *
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import MpesaPushImage from "images/MpesaPushImage.png";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import {
  PaymentButtonSecondary,
  PaymentButtonRipples
} from "components/Buttons";
import { InputConstants } from "utils/constants";
import { orderStatus } from "./constants";

import "./css/mpesa-push.css";

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

  paymentButtonRipplesState = state => {
    let initialState = {
      name: "PAY NOW",
      state: false
    };
    let newState;
    switch (state) {
      case orderStatus.inProgress:
        newState = {
          name: "IN PROGESS..",
          state: true
        };
        break;
      case orderStatus.pending:
      case orderStatus.created:
        newState = {
          name: "ORDER PLACED..",
          state: true
        };
        break;
      case orderStatus.paid:
      case orderStatus.failure:
      case orderStatus.notCreated:
        newState = initialState;
        break;
      default:
        newState = initialState;
        break;
    }

    return newState;
  };

  render() {
    const error = "";
    const inputClassnames = classNames({ "ebt-input-error": error });
    const {
      customer: { phone_number }
    } = this.props;
    const {
      customerErrors: { phone_numberError }
    } = this.state;
    console.log({
      orderStatus: this.paymentButtonRipplesState(this.props.orderStatus).name
    });
    return (
      <div>
        <TabsBodyWrap>
          <div className="ebt-phone-no-edit">
            <div className="mpesa-push-input">
              <label htmlFor="phone_number"> Confirm Mpesa No:</label>
              <div className="ebt-div-information">
                <input
                  className={inputClassnames}
                  onChange={e =>
                    this.props.dispatch({
                      type: "CHANGE_CUSTOMER_NO_SUCCESS",
                      phone_number: e.target.value
                    })
                  }
                  id="phone_number"
                  value={phone_number}
                  type="tel"
                  placeholder="Phone number"
                  required
                  onBlur={e => this.onBlur(e, "phone_number")}
                />
                <span>{phone_numberError}</span>
              </div>
            </div>
            <div className="ebt-order-total">
              AMOUNT KES {this.props.totalTicketsPrice}
            </div>
          </div>
          <div className="mpesa-push-wrap">
            <div className="mpesa-push-div1">
              <p />
              <p className="go-to-paybill-p1">
                Click PAY NOW and check your phone and follow the instructions
                on your screen.
              </p>

              {this.paymentButtonRipplesState(this.props.orderStatus).state ? (
                <section className="mpesa-push-loader-wrap">
                  <div className="mpesa-spinner" />
                </section>
              ) : (
                <div style={{ minHeight: 20 }} />
              )}

              <div className="primary-pay-mpesa">
                <PaymentButtonRipples
                  disabled={this.paymentButtonRipplesState(this.props.orderStatus).state}
                  id="pay"
                  onClick={this.props.handleMobilePayment}
                >
                  {this.paymentButtonRipplesState(this.props.orderStatus).name}
                </PaymentButtonRipples>
              </div>
              {this.props.orderStatus === orderStatus.notCreated ||
              this.props.orderStatus === orderStatus.failure ? (
                <p className="go-to-paybill-p2">
                  Did not see prompt on your phone? To pay manually via Paybill,{" "}
                  <a onClick={this.props.goToPayBill}>click here</a>
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
          <PaymentButtonSecondary
            id="store"
            onClick={this.props.handleReturnToStore}
          >
            RETURN TO STORE
          </PaymentButtonSecondary>
        </TabsBottomWrap>
      </div>
    );
  }
}

MpesaPush.proptypes = {
  orderStatus: PropTypes.bool.isRequired,
  goToPayBill: PropTypes.func.isRequired
};

const mapStateToProps = ({ paymentSystem }) => ({
  customer: paymentSystem.customer,
  orderStatus: paymentSystem.orderStatus
});

export default connect(mapStateToProps, null)(MpesaPush);
