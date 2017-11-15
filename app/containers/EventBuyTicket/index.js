/*
 *
 * EventBuyTicket
 *
 */

import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import classNames from "classnames";
import { countryList } from "utils/countryList";
import Payments from "containers/Payments";
import { InputConstants } from "utils/constants";
import "!!style-loader!css-loader!./buy-tickets.css";
import { handleOrdersPayment, openModal, closeModal } from "./actions";
import {
  phonenumberValidate,
  nameValidate,
  emailValidate
} from "utils/helperFunctions";

const orderInfo = {
  name: "",
  event_fk: "Event",
  item_status: "",
  items_udf: "",
  order_item: "",
  item_price: ""
};
const posterImage =
  "https://mymookh.com/tickets/uploads/posters/big-image-1cf2bde29cc323599a0375d73c85e7d7.jpg";

export class EventBuyTicket extends React.PureComponent {
  state = {
    ticketCategory: {},
    extraInfo: {
      store_fk: "",
      payment_method: "mpesa"
    },
    customer: {
      email: "",
      name: "",
      phone_number: "",
      confirmEmail: ""
    },
    customerErrors: {
      emailError: "",
      phone_numberError: "",
      confirmEmailError: "",
      nameError: ""
    },
    TicketPrices: {},
    error: false,
    totalTicketsPrice: 0
  };

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.customer, this.state.customer)) {
      this.setState(() => ({ customer: nextProps.customer }));
    }
    if (nextProps.totalTicketsPrice !== this.state.totalTicketsPrice) {
      this.setState(() => ({ totalTicketsPrice: nextProps.totalTicketsPrice }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ticketCategory !== this.state.ticketCategory) {
      const priceValueForEvent = this.getTicketPrices(this.props.event);
      const totalTicketsPrice = this.handleTicketsTotalCost(priceValueForEvent);
      console.log({prevProps, prevState, totalTicketsPrice})
      this.setState(() => ({ totalTicketsPrice }));
    }

    if (this.state.totalTicketsPrice > 0) {
      this.setState(() => ({ error: false }));
    }
  }

  onBlur = (e, name) => {
    e.persist();
    const { customerErrors } = this.state;
    const { value } = e.target;
    const requiredFields = ["name", "confirmEmail", "phone_number", "email"];

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

  handleConfirmEmail = (email, confirmEmail) => {
    const { customerErrors } = this.state;
    if (confirmEmail.length < 1) {
      this.setState(() => ({
        customerErrors: {
          ...customerErrors,
          confirmEmailError: "You can't leave this empty."
        }
      }));
    } else {
      this.setState(() => ({
        customerErrors:
          email === confirmEmail
            ? { ...customerErrors, confirmEmailError: "" }
            : { ...customerErrors, confirmEmailError: "Emails don't match." }
      }));
    }
  };

  handleInputChange = e => {
    this.setState({
      ticketCategory: {
        ...this.state.ticketCategory,
        [e.target.id]: e.target.value
      }
    });
  };

  handleTicketsTotalCost = priceValueForEvent => {
    const { ticketCategory } = this.state;
    let total = 0;
    if (Object.keys(ticketCategory).length < 1) return;
    for (let [key, value] of Object.entries(ticketCategory)) {
      total += priceValueForEvent[key] * value;
    }
    return total;
  };

  handleCustomerInfo = e =>
    this.setState({
      customer: { ...this.state.customer, [e.target.id]: e.target.value }
    });

  getTicketPrices = event => {
    if (Object.keys(event).length > 1) {
      const { ticketCategory } = this.state;
      const { event } = this.props;
      const eventAndPrice = {};
      event.tickets_count_by_category.map(
        ticket => (eventAndPrice[ticket.id] = ticket.ticket_value)
      );
      return eventAndPrice;
    }
  };

  getOrderName = (ticketCategory, key) => {
    let name;
    ticketCategory.filter(value => {
      if (value.id === key) {
        name = value.ticket_name;
        return name;
      }
    });
    return name;
  };

  handleEmptyCustomerInfo = () => {
    const { customer, totalTicketsPrice } = this.state;
    const inputerrors = { ...this.state.customerErrors };
    const error = totalTicketsPrice < 1;
    Object.entries(customer).forEach(([key, value]) => {
      if (value.length < 1) {
        inputerrors[`${key}Error`] = "You can't leave this empty.";
      }
    });

    this.setState(() => ({ customerErrors: inputerrors, error }));
  };

  disableBtn = customer => {
    const { totalTicketsPrice } = this.state;
    let res;
    if (totalTicketsPrice < 1) {
      res = false;
    } else {
      Object.entries(customer).forEach(([key, value]) => {
        if (value.length < 1) {
          res = false;
        } else {
          res = true;
        }
      });
    }
    return res;
  };

  render() {
    const {
      error,
      customer,
      ticketCategory,
      totalTicketsPrice,
      customerErrors: {
        emailError,
        phone_numberError,
        confirmEmailError,
        nameError
      },
      customer: { name, phone_number, email, confirmEmail }
    } = this.state;
    const { event } = this.props;
    const totalPriceClassnames = classNames("ticket-total", { errors: error });

    return (
      <div>
        <div className="ticket-description-wrap">
          <div className="event-buy-image">
            <img src={posterImage} alt="product" />
          </div>
          <div className="price-table">
            <table>
              <tbody>
                <tr>
                  <th>TYPE</th>
                  <th>PRICE</th>
                  <th />
                  <th>SUBTOTAL</th>
                </tr>
                {event.tickets_count_by_category.map((ticket, index) => (
                  <tr key={index}>
                    <td>{ticket.ticket_name}</td>
                    <td>{`KES. ${ticket.ticket_value}`}</td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        onChange={this.handleInputChange}
                        id={ticket.id}
                      />
                    </td>
                    <td>{`KES. ${isNaN(
                      this.state.ticketCategory[ticket.id] * ticket.ticket_value
                    )
                      ? (0).toFixed(2)
                      : (this.state.ticketCategory[ticket.id] *
                          ticket.ticket_value
                        ).toFixed(2)}`}</td>
                  </tr>
                ))}
                <tr>
                  <td />
                  <td />
                  <td />
                  <td className={totalPriceClassnames}>
                    KES. {totalTicketsPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <form
              onSubmit={e => e.preventDefault()}
              style={{ margin: 0, padding: 0 }}
            >
              <div className="ebt-information">
                <label>SEND TICKETS TO:</label>
                <div className="ebt-div-information">
                  <input
                    onChange={this.handleCustomerInfo}
                    value={name}
                    id="name"
                    type="text"
                    placeholder="Name"
                    required
                    onBlur={e => this.onBlur(e, "name")}
                  />
                  <span>{nameError}</span>
                </div>
                <div className="ebt-div-information">
                  <input
                    onChange={this.handleCustomerInfo}
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

              <div className="ebt-information">
                <div className="ebt-div-information">
                  <input
                    onChange={this.handleCustomerInfo}
                    id="email"
                    value={email}
                    type="email"
                    placeholder="Email"
                    required={true}
                    onBlur={e => this.onBlur(e, "email")}
                  />
                  <span>{emailError}</span>
                </div>
                <div className="ebt-div-information">
                  <input
                    onChange={this.handleCustomerInfo}
                    id="confirmEmail"
                    value={confirmEmail}
                    type="email"
                    placeholder="Confirm email"
                    required
                    onBlur={() => this.handleConfirmEmail(email, confirmEmail)}
                  />
                  <span>{confirmEmailError}</span>
                </div>
              </div>

              <hr className="buy-ticket-optional" />

              <div className="ebt-optional-info">
                <label className="buy-ticket-optional-info">
                  OPTIONAL INFORMATION:
                </label>

                <div className="ebt-promo-wrap">
                  <div>
                    <input type="text" placeholder="Promo code" />
                  </div>
                  <div className="payment-btn-wrap">
                    <button
                      className="payment-button ripple"
                      onClick={
                        !this.disableBtn(customer)
                          ? this.handleEmptyCustomerInfo
                          : () => this.props.openModal(ticketCategory, customer)
                      }
                    >
                      MOBILE PAYMENT
                    </button>
                    <button
                      onClick={
                        !this.disableBtn(customer)
                          ? this.handleEmptyCustomerInfo
                          : () => this.props.openModal(ticketCategory, customer)
                      }
                      className="payment-button ripple"
                    >
                      CARD PAYMENT
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ payments }) => ({
  customer: payments.customer,
  totalTicketsPrice: payments.totalTicketsPrice
});

const mapDispatchToProps = dispatch => ({
  handleOrdersPayment: info => dispatch(handleOrdersPayment(info)),
  openModal: (ticketCategory, customer) =>
    dispatch(openModal(ticketCategory, customer)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventBuyTicket);
