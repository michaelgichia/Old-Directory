import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, Icon, Input, Row, Col, Select } from 'antd';
import MookhFormItem from './MookhFormItem';
import { EventBtn } from './StyledComponents';
import { PaymentButtonRipples } from 'components/Buttons';
import { countryList } from 'utils/countryList';
import { orderStatus } from './constants';
import { setCardOrMpesaTabIndex } from './actions';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

const dialCodeArray = ['254', '256', '255', '250', '257'];

class Payment extends React.PureComponent {
  state = {
    country: '254',
    dialCode: '254'
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderStatus === this.props.orderStatus.finished) {
      this.props.form.resetFields();
    }
  }

  handleSubmit = tabIndex => {
    this.props.setCardOrMpesaTabIndex(tabIndex);
    if (this.props.totalTicketsPrice < 1) {
      this.props.createError(true);
      return;
    } else {
      this.props.createError(false);
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values.phone_number = `${values.prefix.trim()}${values.phone.trim()}`;
          this.props.handleCustomerDetailsSubmition(values);
        }
      });
    }
  };

  compareToFirstEmail = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('email')) {
      callback('Please confirm your email address');
    } else {
      callback();
    }
  };

  phonenumberValidator = (rule, value, callback) => {
    if (value && value[0] !== '7') {
      callback('Phone number must start with 7');
    } else if (value && value.trim().length > 9) {
      callback('Incorrect format. example 712 123 456');
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
      <Form onSubmit={evt => evt.preventDefault()} className="login-form">
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
                <Input
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
                  {
                    required: true,
                    message: 'Please input your phone number!'
                  },
                  {
                    validator: this.phonenumberValidator
                  }
                ]
              })(
                <Input
                  addonBefore={prefixSelector}
                  title="example: 712 123 456"
                  placeholder="Phone number"
                  maxLength="12"
                />
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
                <Input
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
                <Input
                  prefix={<Icon type="mail" style={{ color: '#ccc' }} />}
                  type="email"
                  placeholder="Confirm email"
                />
              )}
            </MookhFormItem>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <MookhFormItem>
              {getFieldDecorator('promotional_code')(
                <Input
                  prefix={<Icon type="gift" style={{ color: '#ccc' }} />}
                  type="text"
                  placeholder="Promotional code"
                />
              )}
            </MookhFormItem>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <MookhFormItem>
              <Row
                gutter={{ xs: 0, sm: 16, md: 16, lg: 16 }}
                justify="space-between"
              >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <EventBtn type="primary" onClick={() => this.handleSubmit(0)}>
                    MOBILE PAYMENT
                  </EventBtn>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <EventBtn type="primary" onClick={() => this.handleSubmit(1)}>
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

const mapStateToProps = ({ paymentSystem }) => ({
  customer: paymentSystem.customer,
  totalTicketsPrice: paymentSystem.totalTicketsPrice,
  orderStatus: paymentSystem.orderStatus
});

const mapDispatchToProps = dispatch => ({
  setCardOrMpesaTabIndex: cardOrMpesaTabIndex =>
    dispatch(setCardOrMpesaTabIndex(cardOrMpesaTabIndex))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReduxForm = Form.create();

export default compose(withReduxForm, withConnect)(Payment);