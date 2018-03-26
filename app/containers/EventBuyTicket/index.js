/*
 *
 * EventBuyTicket
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import { openModal, closeModal } from './actions';
import PaymentForm from './PaymentForm';
import injectReducer from 'utils/injectReducer';
import './buy-tickets.css';
import reducer from './reducer';
import { TOTAL_TICKETS_PRICE } from "containers/Payments/constants";

const posterImage =
  'https://mymookh.com/tickets/uploads/posters/big-image-1cf2bde29cc323599a0375d73c85e7d7.jpg';

export class EventBuyTicket extends React.PureComponent {
  state = {
    ticketCategory: {},
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
      this.setState(() => ({ customer: nextProps.customer }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ticketCategory !== this.state.ticketCategory) {
      const priceValueForEvent = this.getTicketPrices(this.props.event);
      const totalTicketsPrice = this.handleTicketsTotalCost(priceValueForEvent);
      this.props.handleTotalCost(totalTicketsPrice)
    }

    if (prevProps.totalTicketsPrice > 0) {
      this.setState(() => ({ error: false }));
    }
  }

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

  handleCustomerDetailsSubmition = values => {
    const { ticketCategory } = this.state;
    const { totalTicketsPrice } = this.props;
    if (totalTicketsPrice < 1) {
      this.setState((state, props) => ({ error: true }));
      return;
    }
    this.props.openModal(
      ticketCategory,
      values,
      totalTicketsPrice,
      this.props.event
    );
  };

  render() {
    const { error, ticketCategory } = this.state;
    const { event, totalTicketsPrice } = this.props;
    const totalPriceClassnames = classNames('ticket-total', { errors: error });
    const inputClassnames = classNames({ 'ebt-input-error': error });

    return (
      <div className="ticket-desc-wrapper">
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
              <h4>SEND TICKETS TO:</h4>
              <PaymentForm
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

const mapStateToProps = ({ payments, event }) => ({
  customer: payments.customer,
  totalTicketsPrice: payments.totalTicketsPrice,
  eventError: event.eventError
});

const mapDispatchToProps = dispatch => ({
  handleTotalCost: cost => dispatch({ type: TOTAL_TICKETS_PRICE.SUCCESS, cost }),
  openModal: (ticketCategory, customer, totalTicketsPrice, event) =>
    dispatch(openModal(ticketCategory, customer, totalTicketsPrice, event)),
  closeModal: () => dispatch(closeModal())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'eventBuyTicket', reducer });

export default compose(withReducer, withConnect)(EventBuyTicket);