/*
 *
 * EventBuyTicket
 *
 */

import React from "react";
import { connect } from "react-redux";
import { countryList } from "utils/countryList";
import Payments from "containers/Payments";
import LoadingSpinner from "components/LoadingSpinner";
import EventTopPageDisplay from "containers/EventTopPageDisplay";
import EventMenuBar from "components/EventMenuBar";
import EventSubMenu from "components/EventSubMenu";
import "!!style-loader!css-loader!./buy-tickets.css";
import productImage from "./product-banner.jpg";
import {
  fetchEvent,
  handleOrdersPayment,
  openModal,
  closeModal
} from "./actions";
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

export class EventBuyTicket extends React.PureComponent {
  state = {
    ticketCategory: {},
    event: {},
    customer: {
      email: "mqyynm@gmail.com",
      name: "Michael",
      phone_number: "254701872069",
      confirmEmail: "mqyynm@gmail.com"
    },
    extraInfo: {
      store_fk: "",
      payment_method: "mpesa"
    },
    inputErrors: {
      emailError: "",
      phone_numberError: "",
      confirmEmailError: "",
      nameError: ""
    },
    disabled: true
  };

  componentDidMount() {
    const { eventId } = this.props.params;
    this.props.fetchEvent(eventId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event !== this.state.event) {
      this.setState(() => ({ event: nextProps.event }));
    }
  }

  onBlurPhoneNo = phonenumber => {
    const { inputErrors } = this.state;
    this.setState({
      inputErrors: phonenumberValidate(phonenumber)
        ? { ...inputErrors, phone_numberError: "" }
        : {
            ...inputErrors,
            phone_numberError:
              "This phone number format is invalid or not recognized."
          }
    });
  };

  onBlurEmail = email => {
    const { inputErrors } = this.state;
    this.setState({
      inputErrors: emailValidate(email)
        ? { ...inputErrors, emailError: "" }
        : { ...inputErrors, emailError: "This email address is invalid." }
    });
  };

  onBlurName = name => {
    const { inputErrors } = this.state;
    this.setState({
      inputErrors: nameValidate(name)
        ? { ...inputErrors, nameError: "" }
        : {
            ...inputErrors,
            nameError: "Please use only letters (a-z), numbers, and periods."
          }
    });
  };

  handleConfirmEmail = (email, confirmEmail) => {
    const { inputErrors } = this.state;
    this.setState({
      inputErrors:
        email === confirmEmail
          ? { ...inputErrors, confirmEmailError: "" }
          : { ...inputErrors, confirmEmailError: "Emails don't match." }
    });
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
    if (Object.keys(ticketCategory).length < 1) return "0.00";
    for (let [key, value] of Object.entries(ticketCategory)) {
      total += priceValueForEvent[key] * value;
    }
    return total.toFixed(2);
  };

  handleCustomerInfo = e => {
    const { customer } = this.state;
    this.setState({ customer: { ...customer, [e.target.id]: e.target.value } });
  };

  handlePhonenumber = (telNumber, selectedCountry) => {
    console.log(
      "input changed. number: ",
      telNumber,
      "selected country: ",
      selectedCountry
    );
  };

  handleInputBlur = (telNumber, selectedCountry) => {
    console.log(
      "Focus off the ReactTelephoneInput component. Tel number entered is: ",
      telNumber,
      " selected country is: ",
      selectedCountry
    );
  };

  getPriceValue = event => {
    if (Object.keys(event).length > 1) {
      const { ticketCategory, event } = this.state;
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
    const { customer } = this.state;
    const inputerrors = { ...this.state.inputErrors };
    Object.entries(customer).forEach(([key, value]) => {
      if (value.length < 1) {
        inputerrors[`${key}Error`] = "You can't leave this empty.";
      }
    });
    this.setState(() => ({ inputErrors: inputerrors, disabled: true }));
  };

  disableBtn = customer => {
    let res;
    Object.entries(customer).forEach(([key, value]) => {
      if (value.length < 1) {
        res = false;
      } else {
        res = true;
      }
    });
    return res;
  };

  handleMobilePayment = () => {
    const {
      id,
      event_name,
      tickets_count_by_category,
      store_fk
    } = this.state.event;
    const { ticketCategory, extraInfo, customer, event } = this.state;
    const orderArray = [];

    delete customer.confirmEmail;
    Object.entries(ticketCategory).forEach(([key, value]) => {
      orderArray.push(
        Object.assign(
          {},
          { name: this.getOrderName(tickets_count_by_category, key) },
          { items_id: key },
          { item_quantity: value }
        )
      );
    });
    extraInfo["order_detail"] = orderArray;
    extraInfo["customer"] = customer;
    extraInfo["store_fk"] = store_fk;
    // this.props.handleOrdersPayment(extraInfo);
  };

  render() {
    const {
      event,
      customer: { name, phone_number, email, confirmEmail },
      inputErrors: {
        emailError,
        phone_numberError,
        confirmEmailError,
        nameError
      },
      disabled,
      ticketCategory
    } = this.state;
    const { pathname } = this.props.location;
    const priceValueForEvent = this.getPriceValue(event);

    if (Object.keys(event).length < 1) {
      return (
        <div className="loading-exit">
          <EventTopPageDisplay />
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div>
        <EventTopPageDisplay />
        <div className="mobile ticket-image-wrap grid-33">
          <div>
            <img src={productImage} alt="product" />
          </div>
        </div>

        <EventSubMenu
          eventName={event.event_name}
          eventVenue={event.event_venue}
        />

        <EventMenuBar pathname={pathname} eventId={event.id} />

        <div className="ticket-description-wrap">
          <div className="desktop grid-33">
            <div>
              <img src={productImage} alt="product" />
            </div>
          </div>

          <div className="grid-66 price-table">
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
                      : this.state.ticketCategory[ticket.id] *
                        ticket.ticket_value}`}</td>
                  </tr>
                ))}
                <tr>
                  <td />
                  <td />
                  <td />
                  <td className="ticket-total">{`KES. ${this.handleTicketsTotalCost(
                    priceValueForEvent
                  )}`}</td>
                </tr>
              </tbody>
            </table>

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
                  onBlur={() => this.onBlurName(name)}
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
                  onBlur={() => this.onBlurPhoneNo(phone_number)}
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
                  onBlur={() => this.onBlurEmail(email)}
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
                    className="payment-button"
                    onClick={
                      !this.disableBtn(this.state.customer)
                        ? this.handleEmptyCustomerInfo
                        : this.handleMobilePayment
                    }
                  >
                    MOBILE PAYMENT
                  </button>
                  <button
                    onClick={() => this.props.openModal(ticketCategory)}
                    className="payment-button"
                  >
                    CARD PAYMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ buyTicket }) => ({
  event: buyTicket.event
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId)),
  handleOrdersPayment: info => dispatch(handleOrdersPayment(info)),
  openModal: (ticketCategory) => dispatch(openModal(ticketCategory)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventBuyTicket);