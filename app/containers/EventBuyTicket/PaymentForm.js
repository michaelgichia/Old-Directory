import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, Icon, Input, Row, Col, Select } from 'antd';
import MookhFormItem from './MookhFormItem';
import EventBtn from './EventBtn';
import EventInput from './EventInput';
import { PaymentButtonRipples } from 'components/Buttons';
import { countryList } from 'utils/countryList';

import kenya from './flags/kenya.png';
import burundi from './flags/burundi.png';
import rwanda from './flags/rwanda.png';
import tanzania from './flags/tanzania.png';
import uganda from './flags/uganda.png';
import './buy-tickets.css';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

const dialCodeArray = ['254', '256', '255', '250', '257'];

class Payment extends React.PureComponent {
  state = {
    country: '254',
    dialCode: '254'
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.phone_number = `${values.prefix}${values.phone}`
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

  compareToFirstEmail = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('email')) {
      callback('Please confirm your email address');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { ticketCategory, customer, totalTicketsPrice } = this.props;
    const { country, dialCode } = this.state;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '254'
    })(
      <Select style={{ width: 80 }}>
        <Option value="254">254</Option>
        <Option value="256">256</Option>
        <Option value="255">255</Option>
        <Option value="250">250</Option>
        <Option value="257">257</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <MookhFormItem>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your name!'
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
            <FormItem>
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: 'Please input your phone number!' }
                ]
              })(
                <EventInput addonBefore={prefixSelector} style={{ width: '100%' }} pattern="[0-9]{9}" title="example: 700 000 000" placeholder="Phone number" maxLength="9" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <MookhFormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your email address'
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
                    message: 'Please confirm your email address'
                  },
                  {
                    validator: this.compareToFirstEmail
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
              {getFieldDecorator('promotional_code')(
                <EventInput
                  prefix={<Icon type="gift" style={{ color: '#ccc' }} />}
                  type="text"
                  placeholder="Promotional code"
                />
              )}
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
                    MOBILE PAYMENT
                  </EventBtn>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <EventBtn type="primary" htmlType="submit">
                    CARD PAYMENT
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

const mapStateToProps = ({ payments }) => ({
  customer: payments.customer,
  totalTicketsPrice: payments.totalTicketsPrice
});

const withConnect = connect(mapStateToProps);

const withReduxForm = Form.create();

export default compose(withReduxForm, withConnect)(Payment);

          // <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          //   <InputGroup compact size="large">
          //     {getFieldDecorator('dialCode', {
          //       initialValue: dialCode,
          //       rules: [
          //         { required: true, message: 'Please select country code.' }
          //       ]
          //     })(
          //       <Select
          //         style={{ width: 80, marginBottom: 24, borderRadius: 1 }}
          //         onChange={this.handleDialCode}
          //       >
          //         <Option value="254">
          //           <img src={kenya} style={{ width: 30 }} />
          //         </Option>
          //         <Option value="256">
          //           <img src={uganda} style={{ width: 30 }} />
          //         </Option>
          //         <Option value="255">
          //           <img src={tanzania} style={{ width: 30 }} />
          //         </Option>
          //         <Option value="250">
          //           <img src={rwanda} style={{ width: 30 }} />
          //         </Option>
          //         <Option value="257">
          //           <img src={burundi} style={{ width: 30 }} />
          //         </Option>
          //       </Select>
          //     )}
          //     {getFieldDecorator('phone_number', {
          //       initialValue: dialCode,
          //       rules: [
          //         { required: true, message: 'Please input your phone number' }
          //       ]
          //     })(
          //       <EventInput
          //         style={{ width: 'calc(100% - 80px)', fontSize: 14 }}
          //         type="tel"
          //         placeholder="Phone number"
          //         required={true}
          //         pattern="[0-9]{12}"
          //         title="example: 254 711 111 111"
          //       />
          //     )}
          //   </InputGroup>
          // </Col>