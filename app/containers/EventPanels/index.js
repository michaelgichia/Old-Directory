/**
 *
 * EventPanels
 *
 * Event panels are the components that display events -
 * information on directory landing page.
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import LoadingSpinner from 'components/LoadingSpinner';
// Actions
import { fetchEvents } from './actions';
import { eventPosterBaseUrl } from './constants';
import { randomColor } from 'utils/color-generator';
import chunk from 'lodash/chunk';
import getWindowSize from 'utils/getWindowSize';
import data from './data';
import MookhRow from './MookhRow';
import MookhCol from './MookhCol';
import Panel from './Panel';
import EventPanelsWrap from './EventPanelsWrap';

// Get device width
const deviceWidth =  getWindowSize();
// Calculate number of column per row
// according to device width.
function getItemsPerRow(width) {
  if (width >= 992) return 3;
  else if (width >= 576 && width < 992) return 2;
  else return 1;
}

class EventPanels extends Component {
  state = {
    appState: 'success'
  };

  width = getWindowSize();

  componentDidMount() {
    // this.props.fetchEvents();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.events !== this.state.events) return true;
    return false;
  }

  handleError = e => {
    e.persist();
  };

  render() {
    const { appState } = this.state;

    if (this.props.events.length < 1 || appState === 'fetching') {
      return <LoadingSpinner />;
    }
    return (
      <EventPanelsWrap>
        <div style={{marginTop: 32}}>
          {this.props.events.map((v, i) => (
            <MookhRow key={`${i}i`}>
              {v.map((event, index) => (
                <MookhCol
                  key={event.id}
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={8}
                >
                  <Panel onError={this.handleError} event={event} key={event.id} />
                </MookhCol>
              ))}
            </MookhRow>
          ))}
        </div>
      </EventPanelsWrap>
    );
  }
}

const mapStateToProps = ({ eventPanels }) => ({
  events: chunk(eventPanels.events, getItemsPerRow(deviceWidth))
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPanels);