/*
 *
 * EventBuyTicket
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { Form, Icon, Input, Checkbox, Row, Col, Button, Select } from 'antd';

import classNames from 'classnames';
import { PaymentButtonRipples } from 'components/Buttons';
import { countryList } from 'utils/countryList';
import Payments from 'containers/Payments';
import { InputConstants } from 'utils/constants';
import './buy-tickets.css';
import { openModal, closeModal } from './actions';
import {
  phonenumberValidate,
  nameValidate,
  emailValidate
} from 'utils/helperFunctions';
import EventBtn from './EventBtn';
import MookhFormItem from './MookhFormItem';
import EventInput from './EventInput';

import kenya from './flags/kenya.png';
import burundi from './flags/burundi.png';
import rwanda from './flags/rwanda.png';
import tanzania from './flags/tanzania.png';
import uganda from './flags/uganda.png';

const orderInfo = {
  name: '',
  event_fk: 'Event',
  item_status: '',
  items_udf: '',
  order_item: '',
  item_price: ''
};
const posterImage =
  'https://mymookh.com/tickets/uploads/posters/big-image-1cf2bde29cc323599a0375d73c85e7d7.jpg';
const InputGroup = Input.Group;
const Option = Select.Option;

class Payment extends React.PureComponent {
  state = {
    country: '254',
    dialCode: '254'
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleCustomerDetailsSubmition(values);
      }
    });
  };

  handleCountryChange = value => {
    this.setState({ country: value.target.value });
  };

  handleDialCode = value => {
    this.setState({ country: value, dialCode: value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { country, dialCode } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <MookhFormItem>
              {getFieldDecorator('Name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!'
                  }
                ]
              })(
                <EventInput
                  prefix={<Icon type="user" style={{ color: '#ccc' }} />}
                  placeholder="Name"
                />
              )}
            </MookhFormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputGroup compact size="large">
              <Select style={{width: '25%', marginBottom: 24, borderRadius: 1}} value={dialCode} onChange={this.handleDialCode}>
                <Option value="254">
                  <img src={kenya} style={{ width: 40, }} />
                </Option>
                <Option value="256">
                  <img src={uganda} style={{ width: 40 }} />
                </Option>
                <Option value="255">
                  <img src={tanzania} style={{ width: 40 }} />
                </Option>
                <Option value="250">
                  <img src={rwanda} style={{ width: 40 }} />
                </Option>
                <Option value="257">
                  <img src={burundi} style={{ width: 40 }} />
                </Option>
              </Select>
              <EventInput
                style={{width: '75%'}}
                onChange={this.handleCountryChange}
                value={country}
                type="tel"
                placeholder="Phone number"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <MookhFormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Email!'
                  }
                ]
              })(
                <EventInput
                  prefix={<Icon type="mail" style={{ color: '#ccc' }} />}
                  type="email"
                  placeholder="Email"
                />
              )}
            </MookhFormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <MookhFormItem>
              {getFieldDecorator('confirmEmail', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your Email!'
                  }
                ]
              })(
                <EventInput
                  prefix={<Icon type="mail" style={{ color: '#ccc' }} />}
                  type="email"
                  placeholder="Confirm email"
                />
              )}
            </MookhFormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <MookhFormItem>
              <EventInput
                prefix={<Icon type="gift" style={{ color: '#ccc' }} />}
                type="email"
                placeholder="Promotional code"
              />
            </MookhFormItem>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <MookhFormItem>
              <Row
                gutter={{ xs: 0, sm: 16, md: 16, lg: 16 }}
                justify="space-between"
              >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <EventBtn type="primary" htmlType="submit">
                    MOBILE
                  </EventBtn>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <EventBtn type="primary" htmlType="submit">
                    CARD
                  </EventBtn>
                </Col>
              </Row>
            </MookhFormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const PaymentForm = Form.create()(Payment);

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
    totalTicketsPrice: 0
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.customer, this.state.customer)) {
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
      this.setState(() => ({ totalTicketsPrice }));
    }

    if (this.state.totalTicketsPrice > 0) {
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
    const { ticketCategory, totalTicketsPrice } = this.state;
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
    const { error, totalTicketsPrice } = this.state;
    const { event } = this.props;
    const totalPriceClassnames = classNames('ticket-total', { errors: error });
    const inputClassnames = classNames({ 'ebt-input-error': error });

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

const mapStateToProps = ({ payments }) => ({
  customer: payments.customer,
  totalTicketsPrice: payments.totalTicketsPrice
});

const mapDispatchToProps = dispatch => ({
  openModal: (ticketCategory, customer, totalTicketsPrice, event) =>
    dispatch(openModal(ticketCategory, customer, totalTicketsPrice, event)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventBuyTicket);

// <form
//   onSubmit={e => e.preventDefault()}
//   style={{ margin: 0, padding: 0 }}
// >
//   <div className="ebt-information">
//     <label>SEND TICKETS TO:</label>
//     <div className="ebt-div-information">
//       <input
//         className={inputClassnames}
//         onChange={this.handleCustomerInfo}
//         value={name}
//         id="name"
//         type="text"
//         placeholder="Name"
//         required
//         onBlur={e => this.onBlur(e, 'name')}
//       />
//       <span>{nameError}</span>
//     </div>
//     <div className="ebt-div-information">
//       <input
//         className={inputClassnames}
//         onChange={this.handleCustomerInfo}
//         id="phone_number"
//         value={phone_number}
//         type="tel"
//         placeholder="Phone number"
//         required
//         onBlur={e => this.onBlur(e, 'phone_number')}
//       />
//       <span>{phone_numberError}</span>
//     </div>
//   </div>

//   <div className="ebt-information">
//     <div className="ebt-div-information">
//       <input
//         className={inputClassnames}
//         onChange={this.handleCustomerInfo}
//         id="email"
//         value={email}
//         type="email"
//         placeholder="Email"
//         required={true}
//         onBlur={e => this.onBlur(e, 'email')}
//       />
//       <span>{emailError}</span>
//     </div>
//     <div className="ebt-div-information">
//       <input
//         className={inputClassnames}
//         onChange={this.handleCustomerInfo}
//         id="confirmEmail"
//         value={confirmEmail}
//         type="email"
//         placeholder="Confirm email"
//         required
//         onBlur={() => this.handleConfirmEmail(email, confirmEmail)}
//       />
//       <span>{confirmEmailError}</span>
//     </div>
//   </div>

//   {error && (
//     <h3
//       style={{
//         color: 'red',
//         margin: '16px 0px',
//         textAlign: 'center',
//         width: '100%',
//         display: 'block'
//       }}
//     >
//       Please fix the above errors
//     </h3>
//   )}

//   <div className="ebt-optional-info">
//     <label className="buy-ticket-optional-info">
//       OPTIONAL INFORMATION:
//     </label>

//     <div className="ebt-promo-wrap">
//       <div>
//         <input type="text" placeholder="Promo code" />
//       </div>
//       <div className="payment-btn-wrap">
//         <button
//           className="payment-button ripple"
//           onClick={
//             !this.disableBtn(customer)
//               ? this.handleEmptyCustomerInfo
//               : () =>
//                   this.props.openModal(
//                     ticketCategory,
//                     customer,
//                     totalTicketsPrice
//                   )
//           }
//         >
//           MOBILE PAYMENT
//         </button>
//         <button
//           onClick={
//             !this.disableBtn(customer)
//               ? this.handleEmptyCustomerInfo
//               : () =>
//                   this.props.openModal(
//                     ticketCategory,
//                     customer,
//                     totalTicketsPrice
//                   )
//           }
//           className="payment-button ripple"
//         >
//           CARD PAYMENT
//         </button>
//       </div>
//     </div>
//   </div>
// </form>

// onBlur = (e, name) => {
//   e.persist();
//   const { customerErrors } = this.state;
//   const { value } = e.target;
//   const requiredFields = ['name', 'confirmEmail', 'phone_number', 'email'];

//   if (requiredFields.indexOf(name) > -1 && value.length < 1) {
//     this.setState(() => ({
//       customerErrors: {
//         ...customerErrors,
//         [`${name}Error`]: "You can't leave this empty."
//       }
//     }));
//   } else {
//     this.setState(() => ({
//       customerErrors: InputConstants[name]['regex'].test(value)
//         ? { ...customerErrors, [`${name}Error`]: '' }
//         : {
//             ...customerErrors,
//             [`${name}Error`]: InputConstants[name].error
//           }
//     }));
//   }
// };

//   handleEmptyCustomerInfo = () => {
//   const { customer, totalTicketsPrice } = this.state;
//   const inputerrors = { ...this.state.customerErrors };
//   const error = totalTicketsPrice < 1;
//   Object.entries(customer).forEach(([key, value]) => {
//     if (value.length < 1) {
//       inputerrors[`${key}Error`] = "You can't leave this empty.";
//     }
//   });

//   this.setState(() => ({ customerErrors: inputerrors, error }));
// };

//   disableBtn = customer => {
//   const { totalTicketsPrice } = this.state;
//   let res;
//   if (totalTicketsPrice < 1) {
//     res = false;
//   } else {
//     Object.entries(customer).forEach(([key, value]) => {
//       if (value.length < 1) {
//         res = false;
//       } else {
//         res = true;
//       }
//     });
//   }
//   return res;
// };

// handleCustomerInfo = e =>
// this.setState({
//   customer: { ...this.state.customer, [e.target.id]: e.target.value }
// });

// handleConfirmEmail = (email, confirmEmail) => {
//     const { customerErrors } = this.state;
//     if (confirmEmail.length < 1) {
//       this.setState(() => ({
//         customerErrors: {
//           ...customerErrors,
//           confirmEmailError: "You can't leave this empty."
//         }
//       }));
//     } else {
//       this.setState(() => ({
//         customerErrors:
//           email === confirmEmail
//             ? { ...customerErrors, confirmEmailError: '' }
//             : { ...customerErrors, confirmEmailError: "Emails don't match." }
//       }));
//     }
//   };