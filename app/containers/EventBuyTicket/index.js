/*
 *
 * EventBuyTicket
 *
 */

import React from "react";
import { connect } from "react-redux";
import LoadingSpinner from "components/LoadingSpinner";
import EventTopPageDisplay from "containers/EventTopPageDisplay";
import EventMenuBar from "components/EventMenuBar";
import EventSubMenu from "components/EventSubMenu";
import "!!style-loader!css-loader!./buy-tickets.css";
import productImage from "./product-banner.jpg";
import { fetchEvent, hadleOrdersPayment } from "./actions";

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
      email: "gichuru.gichi@gmail.com",
      name: "Gichia",
      phone_number: "0710853398",
      confirmEmail: "gichuru.gichi@gmail.com"
    },
    extraInfo: {
      flag_sms_sent: false,
      flag_email_sent: false,
      store_fk: "",
      payment_method: "mpesa",
      order_amount: "",
      order_udf: "",
      manual_completion_reason: "",
      order_status: "",
      order_number: "",
      order_type: ""
    },
    inputErrors: {
      emailError: "",
      phonenumberError: "",
      confirmEmailError: "",
      nameError: ""
    }
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

  handleInputChange = e => {
    const newTicketCategory = { ...this.state.ticketCategory };
    newTicketCategory[e.target.id] = e.target.value;
    this.setState({ ticketCategory: newTicketCategory });
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

  getTicketsPrices = (category, ticketId) => {
    let ticketPrice;
    category.map(ticket => {
      if (ticket.id === ticketId) {
        ticketPrice = ticket.ticket_value;
      }
    });
    return ticketPrice;
  };

  handleMobilePayment = () => {
    const {
      id,
      event_name,
      tickets_count_by_category,
      store_fk
    } = this.state.event;
    const { ticketCategory, extraInfo, customer } = this.state;
    const orderArray = [];
    const orderInfo = {
      name: event_name,
      event_fk: id,
      item_status: "",
      items_udf: "",
      item_price: ""
    };

    Object.entries(ticketCategory).forEach(([key, value]) => {
      orderArray.push(
        Object.assign(
          {},
          orderInfo,
          { order_fk: key },
          { item_quantity: value },
          { item_price: this.getTicketsPrices(tickets_count_by_category, key) }
        )
      );
    });
    extraInfo["order_detail"] = orderArray;
    extraInfo["customer"] = customer;
    extraInfo["store_fk"] = store_fk;
    this.props.hadleOrdersPayment(extraInfo);
  };

  render() {
    const {
      event,
      customer: { name, phone_number, email, confirmEmail },
      inputErrors: {
        emailError,
        phonenumberError,
        confirmEmailError,
        nameError
      }
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
                />
                <span>{nameError}</span>
              </div>
              <div className="ebt-div-information">
                <input
                  onChange={this.handleCustomerInfo}
                  id="phonenumber"
                  value={phone_number}
                  type="number"
                  placeholder="Phone number"
                  required
                />
                <span>{phonenumberError}</span>
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
                  required
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
                />
                <span>{confirmEmailError}</span>
              </div>
            </div>

            <hr className="buy-ticket-optional" />

            <div className="ebt-optional-info">
              <span className="buy-ticket-optional-info">
                OPTIONAL INFORMATION:
              </span>

              <div className="ebt-promo-wrap">
                <div>
                  <input type="password" placeholder="Promo code" />
                </div>
                <div className="payment-btn-wrap">
                  <button
                    className="payment-button"
                    onClick={this.handleMobilePayment}
                  >
                    MOBILE PAYMENT
                  </button>
                  <button className="payment-button">CARD PAYMENT</button>
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
  hadleOrdersPayment: info => dispatch(hadleOrdersPayment(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventBuyTicket);