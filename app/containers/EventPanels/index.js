/**
 *
 * EventPanels
 *
 * Event panels are the components that display events -
 * information on directory landing page.
 *
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import LoadingSpinner from 'components/LoadingSpinner';
import injectReducer from 'utils/injectReducer';
// Actions
import { fetchEvents } from './actions';
import reducer from './reducer';
import { eventPosterBaseUrl } from './constants';
import { randomColor } from 'utils/color-generator';
import chunk from 'lodash/chunk';
import getWindowSize from 'utils/getWindowSize';
import data from './data';
import MookhRow from './MookhRow';
import MookhCol from './MookhCol';
import Panel from './Panel';
import EventPanelsWrap from './EventPanelsWrap';
import Wrapper from './Wrapper';
import NoEventsDiv from './NoEventsDiv';
import noevents from './images/no-events.png';

// Get device width
const deviceWidth = getWindowSize();
// Calculate number of column per row
// according to device width.
function getItemsPerRow(width) {
  if (width >= 992) return 3;
  else if (width >= 576 && width < 992) return 2;
  else return 1;
}

class EventPanels extends Component {
  width = getWindowSize();

  componentDidMount() {
    this.props.fetchEvents();
  }

  handleError = e => {
    e.persist();
  };

  render() {
    const { appState } = this.props;

    if (appState === 'fetching') {
      return <LoadingSpinner />;
    }

    if (appState === 'success' && this.props.events.length < 1) {
      return (
        <Wrapper>
          <NoEventsDiv>
            <img src={noevents} />
            <h4>no available events at the moment</h4>
          </NoEventsDiv>
        </Wrapper>
      );
    }

    return (
      <EventPanelsWrap>
        <Wrapper>
          {this.props.events.map((v, i) => (
            <MookhRow key={`${i}i`}>
              {v.map((event, index) => (
                <MookhCol key={event.id} xs={24} sm={12} md={12} lg={8} xl={8}>
                  <Panel
                    onError={this.handleError}
                    event={event}
                    key={event.id}
                  />
                </MookhCol>
              ))}
            </MookhRow>
          ))}
        </Wrapper>
      </EventPanelsWrap>
    );
  }
}

const mapStateToProps = ({ eventPanels }) => ({
  events: chunk(eventPanels.events, getItemsPerRow(deviceWidth)),
  appState: eventPanels.appState
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'eventPanels', reducer });

export default compose(withReducer, withConnect)(EventPanels);