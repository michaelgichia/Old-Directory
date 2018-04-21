/*
 *
 * BuyTicket
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import { openModal, closeModal } from './actions';
import PaymentForm from './PaymentForm';
import { TOTAL_TICKETS_PRICE } from "./constants";
import noImage from "images/no_image.svg";
import './css/buy-tickets.css';


export class BuyTicket extends React.PureComponent {
  state = {
    ticketCategory: {},
    unmountKey: "ticketCategory",
    customer: {
      email: '',
      name: '',
      phone_number: '',
      confirmEmail: ''
    },
    TicketPrices: {},
    error: false,
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.customer, this.state.customer)) {
      this.setState({ customer: nextProps.customer });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ticketCategory !== this.state.ticketCategory) {
      const priceValueForEvent = this.getTicketPrices(this.props.event);
      const totalTicketsPrice = this.handleTicketsTotalCost(priceValueForEvent);
      this.props.handleTotalCost(totalTicketsPrice)
    }

    if (prevProps.totalTicketsPrice > 0) {
      this.setState({ error: false });
    }
  }

  handleInputChange = e => {
    e.persist()
    this.setState(() => ({
      ticketCategory: {
        ...this.state.ticketCategory,
        [e.target.id]: e.target.value
      }
    }));
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

  getTicketPrices = event => {
    if (Object.keys(event).length > 1) {
      const eventAndPrice = {};
      this.props.event.tickets_count_by_category.map(
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

  createError = (bool) => {
    this.setState(() => ({ error: bool }));
  };

  handleCustomerDetailsSubmition = values => {
    const { ticketCategory } = this.state;
    const { totalTicketsPrice } = this.props;
    if (totalTicketsPrice < 1) {
      this.setState({ error: true });
      return;
    }
    this.setState(() => ({unmountKey: "funnykey"}));
    this.props.openModal(
      ticketCategory,
      values,
      totalTicketsPrice,
      this.props.event
    );
  };

  render() {
    const { error, ticketCategory, unmountKey } = this.state;
    const { event, totalTicketsPrice } = this.props;
    const totalPriceClassnames = classNames('ticket-total', { errors: error });
    const inputClassnames = classNames({ 'ebt-input-error': error });

    return (
      <div key={unmountKey} style={{display: "flex", justifyContent: "center"}}>
        <div className="ticket-description-wrap">
          <div className="event-buy-image">
            <img src={event.event_poster === null ? noImage : event.event_poster} alt="product" />
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
                        className={inputClassnames}
                        type="number"
                        placeholder="0"
                        min="0"
                        onChange={this.handleInputChange}
                        id={ticket.id}
                      />
                    </td>
                    <td>{`KES. ${
                      isNaN(
                        this.state.ticketCategory[ticket.id] *
                          ticket.ticket_value
                      )
                        ? (0).toFixed(2)
                        : (
                            this.state.ticketCategory[ticket.id] *
                            ticket.ticket_value
                          ).toFixed(2)
                    }`}</td>
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
            {error && (
              <h5
                style={{
                  color: 'red',
                  margin: '8px 0px',
                  textAlign: 'right',
                  width: '100%',
                  display: 'block'
                }}
              >
                You have not selected a ticket.
              </h5>
            )}
            <div className="ebt-information">
              <h6 style={{fontWeight: "bold", marginBottom: 8}}>SEND TICKETS TO:</h6>
              <PaymentForm
                createError={this.createError}
                ticketCategory={ticketCategory}
                handleCustomerDetailsSubmition={
                  this.handleCustomerDetailsSubmition
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ paymentSystem }) => ({
  customer: paymentSystem.customer,
  totalTicketsPrice: paymentSystem.totalTicketsPrice,
  eventError: paymentSystem.eventError
});

const mapDispatchToProps = dispatch => ({
  handleTotalCost: cost => dispatch({ type: TOTAL_TICKETS_PRICE.SUCCESS, cost }),
  openModal: (ticketCategory, customer, totalTicketsPrice, event) =>
    dispatch(openModal(ticketCategory, customer, totalTicketsPrice, event)),
  closeModal: () => dispatch(closeModal())
});


export default connect(mapStateToProps, mapDispatchToProps)(BuyTicket);