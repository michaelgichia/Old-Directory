/*
 *
 * BuyTicket
 *
 */

import React from "react";
import { connect } from "react-redux";
import LoadSpinner from "components/LoadSpinner";
import EventNavBar from "containers/EventNavBar";
import MenuTabsLargeScreen from "components/MenuTabsLargeScreen";
import EventInfoMenu from "components/EventInfoMenu";
import { Form } from "semantic-ui-react";
import "!!style-loader!css-loader!./buy-tickets.css";
import productImage from "./product-banner.jpg";
import { fetchEvent } from "./actions";

export class BuyTicket extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
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

  render() {
    const { event } = this.state;
    const { pathname } = this.props.location;

    if (Object.keys(event).length < 1) {
      return (
        <div className="loading-exit">
          <EventNavBar />
          <LoadSpinner />
        </div>
      );
    }

    return (
      <div>
        <EventNavBar />
        <div className="mobile ticket-image-wrap grid-33">
          <div>
            <img src={productImage} alt="product" />
          </div>
        </div>

        <EventInfoMenu
          eventName={event.event_name}
          eventVenue={event.event_venue}
        />

        <MenuTabsLargeScreen
          pathname={pathname}
          eventId={event.id}
        />

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
                    <td>{ ticket.ticket_name }</td>
                    <td>{`KES. ${ticket.ticket_value}`}</td>
                    <td>
                      <input type="number" defaultValue={0} min="0" />
                    </td>
                    <td>KES. 0.00</td>
                  </tr>
                  ))}
                <tr>
                  <td />
                  <td />
                  <td />
                  <td className="ticket-total">KES. 0.00</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicket);