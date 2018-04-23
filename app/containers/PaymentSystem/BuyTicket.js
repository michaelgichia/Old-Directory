/*
 *
 * BuyTicket
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';
import omitBy from 'lodash/omitBy';
import classNames from 'classnames';

import { openModal, closeModal, handleTotalCost } from './actions';
import { orderStatus } from './constants';
import PaymentForm from './PaymentForm';
import noImage from 'images/no_image.svg';
import './css/buy-tickets.css';

export class BuyTicket extends React.PureComponent {
  constructor(props) {
    super(props);
    const ticketCategory = {};
    props.event.tickets_count_by_category.map(
      ticket => (ticketCategory[ticket.id] = '')
    );
    this.state = {
      ticketCategory: ticketCategory,
      customer: {
        email: '',
        name: '',
        phone_number: '',
        confirmEmail: ''
      },
      TicketPrices: {},
      error: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.customer, this.state.customer)) {
      this.setState({ customer: nextProps.customer });
    }

    if (nextProps.totalTicketsPrice > 0) {
      this.setState({ error: false });
    }

    if (nextProps.orderStatus === orderStatus.finished) {
      this.setState((state, props) => {
        const newTicketCategory = {};
        Object.entries({ ...state.ticketCategory }).forEach(([k, v]) => {
          newTicketCategory[k] = '';
        });
        return {
          ticketCategory: newTicketCategory
        };
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ticketCategory !== this.state.ticketCategory) {
      const valueForEachTicket = this.getTicketsPrices(this.props.event);
      const totalTicketsPrice = this.handleTicketsTotalCost(
        valueForEachTicket,
        this.state.ticketCategory
      );
      this.props.handleTotalCost(totalTicketsPrice);
    }

    if (prevProps.totalTicketsPrice > 0) {
      this.setState({ error: false });
    }
  }

  handleInputChange = e => {
    e.persist();
    this.setState(state => ({
      ticketCategory: {
        ...state.ticketCategory,
        [e.target.id]: e.target.value
      }
    }));
  };

  handleTicketsTotalCost = (valueForEachTicket, ticketCategory) => {
    let total = 0;
    for (let [key, value] of Object.entries(ticketCategory)) {
      total += valueForEachTicket[key] * value;
    }
    return total;
  };

  getTicketsPrices = event => {
    const mapTicketandPriceObj = {};
    if (event) {
      event.tickets_count_by_category.map(
        ticket => (mapTicketandPriceObj[ticket.id] = ticket.ticket_value)
      );
    }
    return mapTicketandPriceObj;
  };

  throwNewError = bool => this.setState({ error: bool });

  handleCustomerDetailsSubmition = values => {
    const ticketCategory = omitBy(
      this.state.ticketCategory,
      v => Number(v) < 1
    );
    const { totalTicketsPrice } = this.props;
    if (totalTicketsPrice < 1) {
      this.throwNewError(true);
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="ticket-description-wrap">
          <div className="event-buy-image">
            <img
              src={event.event_poster === null ? noImage : event.event_poster}
              alt="product"
            />
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
                        value={ticketCategory[ticket.id]}
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
              <h6 style={{ fontWeight: 'bold', marginBottom: 8 }}>
                SEND TICKETS TO:
              </h6>
              <PaymentForm
                createError={this.throwNewError}
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
  orderStatus: paymentSystem.orderStatus
});

const mapDispatchToProps = dispatch => ({
  handleTotalCost: cost => dispatch(handleTotalCost(cost)),
  openModal: (ticketCategory, customer, totalTicketsPrice, event) =>
    dispatch(openModal(ticketCategory, customer, totalTicketsPrice, event)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicket);

// getOrderName = (ticketCategory, key) => {
//   let name;
//   ticketCategory.filter(value => {
//     if (value.id === key) {
//       name = value.ticket_name;
//       return name;
//     }
//   });
//   return name;
// };