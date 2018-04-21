/**
 *
 * PaymentSystem
 *
 */

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { TabPanel } from 'react-tabs';
import { Tabs as MobileTabs } from 'antd';
// Utils
import filter from 'lodash/filter';
import size from 'lodash/size';
// Components
import TopPageDisplay from './TopPageDisplay';
import LoadingSpinner from 'components/LoadingSpinner';
import { TabsWrap } from './StyledComponents';
import PaymentModal from './PaymentModal';
import EventSubMenu from 'components/EventSubMenu';
import EventMenuTab from 'components/EventMenuTab';
import EventInfomation from './EventInfomation';
import BuyTicket from './BuyTicket';
// Funcs
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { getInnerText } from 'utils/helperFunctions';
import { fetchEvent } from './actions';

const TabPane = MobileTabs.TabPane;

export class PaymentSystem extends React.Component {
  constructor(props) {
    super(props);
    const data =
      props.events.length > 0
        ? filter(props.events, event => event.id === props.match.params.id)[0]
        : {};
    this.state = {
      event: data
    };
  }
  componentWillMount() {
    if (size(this.state.event) < 1) {
      const { id } = this.props.match.params;
      this.props.fetchEvent(id);
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event !== this.state.event) {
      this.setState({ event: nextProps.event });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (size(this.state.event) < 1) {
      const { id } = this.props.match.params;
      this.props.fetchEvent(id);
    }
  }

  render() {
    const { event } = this.state;
    if (size(event) < 1) {
      return (
        <div className="loading-exit">
          <TopPageDisplay />
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <Fragment>
        <Helmet
          titleTemplate={`Mookh | ${event.event_name}`}
          defaultTitle={`Mookh | ${event.event_name}`}
          meta={[
            {
              name: 'description',
              content: `${getInnerText(event.event_description)}`
            }
          ]}
        >
        <script id="hpfScript" src="https://ap-gateway.mastercard.com/form/v3/hpf.js" async></script>
      </Helmet>
        <TopPageDisplay />
        <EventSubMenu
          eventName={event.event_name}
          eventVenue={event.event_venue}
        />
        <TabsWrap>
          <MobileTabs
            defaultActiveKey="1"
            tabPosition="top"
            style={{ minHeight: '50vh' }}
          >
            <TabPane tab="BUY TICKETS" key="1">
              <BuyTicket event={event} />
            </TabPane>
            <TabPane tab="EVENT INFO" key="2">
              <EventInfomation event={event} />
            </TabPane>
          </MobileTabs>
        </TabsWrap>

        <EventMenuTab>
          <TabPanel>
            <BuyTicket event={event} />
          </TabPanel>
          <TabPanel>
            <EventInfomation event={event} />
          </TabPanel>
        </EventMenuTab>
        <PaymentModal />
      </Fragment>
    );
  }
}

PaymentSystem.propTypes = {};

const mapStateToProps = ({ paymentSystem, eventPanels }) => ({
  event: paymentSystem.event,
  events: eventPanels.events
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

const withReducer = injectReducer({ key: 'paymentSystem', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
)(PaymentSystem);
