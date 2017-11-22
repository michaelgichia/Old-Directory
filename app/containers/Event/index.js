/*
 *
 * Event
 *
 */

import React, { PropTypes } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { fetchEvent } from "./actions";
import { TabPanel } from "react-tabs";
import { Tabs as MobileTabs } from "antd";
import EventTopPageDisplay from "containers/EventTopPageDisplay";
import LoadingSpinner from "components/LoadingSpinner";
import EventSubMenu from "components/EventSubMenu";
import EventMenuTab from "components/EventMenuTab";
import EventInfomation from "containers/EventInfomation";
import EventBuyTicket from "containers/EventBuyTicket";
import EventGallery from "containers/EventGallery";
import EventSchedules from "containers/EventSchedules";
import EventSiteMap from "containers/EventSiteMap";
import EventSponsors from "containers/EventSponsors";

import { getInnerText } from "utils/helperFunctions";
import "!!style-loader!css-loader!./event.css";

const TabPane = MobileTabs.TabPane;

export class Event extends React.Component {
  componentWillMount() {
    const { eventId } = this.props.params;
    this.props.fetchEvent(eventId);
  }

  render() {
    const { event } = this.props;

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
        <Helmet
          titleTemplate={`Mookh | ${event.event_name}`}
          defaultTitle={`Mookh | ${event.event_name}`}
          meta={[
            {
              name: "description",
              content: `${getInnerText(event.event_description)}`
            }
          ]}
        />
        <EventTopPageDisplay />
        <EventSubMenu
          eventName={event.event_name}
          eventVenue={event.event_venue}
        />
        <div className="show-mobile">
          <MobileTabs
            defaultActiveKey="1"
            tabPosition="top"
            style={{ minHeight: "50vh" }}
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
              <EventSchedules />
            </TabPane>
            <TabPane tab="SCHEDULES $ SPEAKERS" key="5">
              <EventSiteMap />
            </TabPane>
            <TabPane tab="SPONSORS" key="6">
              <EventSponsors />
            </TabPane>
          </MobileTabs>
        </div>

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
            <EventSchedules />
          </TabPanel>
          <TabPanel>
            <EventSiteMap />
          </TabPanel>
          <TabPanel>
            <EventSponsors />
          </TabPanel>
        </EventMenuTab>
      </div>
    );
  }
}

const mapStateToProps = ({ event }) => ({
  event: event.event
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);