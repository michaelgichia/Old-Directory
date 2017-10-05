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
import { Form } from "semantic-ui-react";
import "!!style-loader!css-loader!./buy-tickets.css";
import productImage from "./product-banner.jpg";
import { fetchEvent } from "./actions";

export class EventBuyTicket extends React.PureComponent {
  state = {
    ticketCategory: {},
    event: {}
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

  render() {
    const { event } = this.state;
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
                      ? 0.0
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

            <Form className="pay-tickets">
              <label>SEND TICKETS TO:</label>
              <Form.Group widths={2}>
                <Form.Input placeholder="name" />
                <Form.Input placeholder="phone number" />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input placeholder="email" />
                <Form.Input placeholder="confirm email" />
              </Form.Group>
            </Form>

            <hr className="buy-ticket-optional" />

            <span className="buy-ticket-optional-info">
              OPTIONAL INFORMATION:
            </span>

            <Form className="pay-tickets">
              <label>PROMO CODE (optional)</label>
              <Form.Group widths={2}>
                <Form.Input placeholder="promo code" />
                <div className="payment-btn-wrap">
                  <div>
                    <button className="payment-button">MOBILE PAYMENT</button>
                  </div>
                  <div>
                    <button className="payment-button">CARD PAYMENT</button>
                  </div>
                </div>
              </Form.Group>
            </Form>
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
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventBuyTicket);