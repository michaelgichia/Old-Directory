/*
 *
 * Event
 *
 */

import React, { PropTypes, Fragment } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { TabPanel } from 'react-tabs';
import { Tabs as MobileTabs } from 'antd';
import filter from 'lodash/filter';
import size from 'lodash/size';
import { fetchEvent } from './actions';
import EventTopPageDisplay from 'containers/EventTopPageDisplay';
import LoadingSpinner from 'components/LoadingSpinner';
import EventSubMenu from 'components/EventSubMenu';
import EventMenuTab from 'components/EventMenuTab';
import EventInfomation from 'containers/EventInfomation';
import EventBuyTicket from 'containers/EventBuyTicket';
import EventGallery from 'containers/EventGallery';
import EventSchedules from 'containers/EventSchedules';
import EventSiteMap from 'containers/EventSiteMap';
import EventSponsors from 'containers/EventSponsors';
import TabsWrap from './TabsWrap';
import { getInnerText } from 'utils/helperFunctions';

const TabPane = MobileTabs.TabPane;


export class Event extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { event } = this.props;
    if (size(event) < 1) {
      return (
        <div className="loading-exit">
          <EventTopPageDisplay />
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
        />
        <EventTopPageDisplay />
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
              <EventBuyTicket event={event} />
            </TabPane>
            <TabPane tab="EVENT INFO" key="2">
              <EventInfomation event={event} />
            </TabPane>
            <TabPane tab="GALLERY" key="3">
              <EventGallery />
            </TabPane>
            <TabPane tab="SITE MAP" key="4">
              <EventSiteMap />
            </TabPane>
            <TabPane tab="SCHEDULES $ SPEAKERS" key="5">
              <EventSchedules />
            </TabPane>
            <TabPane tab="SPONSORS" key="6">
              <EventSponsors />
            </TabPane>
          </MobileTabs>
        </TabsWrap>

        <EventMenuTab>
          <TabPanel>
            <EventBuyTicket event={event} />
          </TabPanel>
          <TabPanel>
            <EventInfomation event={event} />
          </TabPanel>
          <TabPanel>
            <EventGallery />
          </TabPanel>
          <TabPanel>
            <EventSiteMap />
          </TabPanel>
          <TabPanel>
            <EventSchedules />
          </TabPanel>
          <TabPanel>
            <EventSponsors />
          </TabPanel>
        </EventMenuTab>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ event, eventPanels }, ownProps) => {
  const newEvent = filter(eventPanels.events, { id: ownProps.match.params.id })[0];
  return {
    event: newEvent
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
