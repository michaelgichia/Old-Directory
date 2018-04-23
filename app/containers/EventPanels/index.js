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
import InfiniteScroll from 'react-infinite-scroller';
import { message, Spin } from 'antd';
import LoadingSpinner from 'components/LoadingSpinner';
import injectReducer from 'utils/injectReducer';
import { eventPosterBaseUrl } from './constants';
import { fetchEvents, fetchMoreEvents } from './actions';
import reducer from './reducer';
import { randomColor } from 'utils/color-generator';
import chunk from 'lodash/chunk';
import getWindowSize from 'utils/getWindowSize';
import Panel from './Panel';
import {
  Wrapper,
  MookhRow,
  MookhCol,
  EventPanelsWrap,
  NoEventsDiv
} from './StyledComponents';
import noevents from './images/no-events.png';

const deviceWidth = getWindowSize();
function getItemsPerRow(width) {
  if (width >= 992) return 3;
  else if (width >= 576 && width < 992) return 2;
  else return 1;
}

message.config({
  top: 100,
  duration: 5
});

class EventPanels extends Component {
  state = {
    hasMore: true,
    currentPage: 0
  };

  width = getWindowSize();

  componentDidMount() {
    this.props.fetchEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.pagination.hasMore) {
      message.success('Yay! You have seen it all');
    }
  }

  handleError = e => {
    e.persist();
  };

  handleInfiniteLoad = () => {
    const { pagination: { hasMore, currentPage } } = this.props;
    if (currentPage > 1 && hasMore && currentPage !== this.state.currentPage) {
      this.props.fetchMoreEvents(currentPage + 1);
      this.setState({ currentPage });
    }
  };

  render() {
    const {
      appState,
      pagination: { currentPage, dataLength, hasMore, isInfiniteLoading }
    } = this.props;

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
      <Wrapper>
        <EventPanelsWrap>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteLoad}
            hasMore={hasMore}
            useWindow
          >
            <Wrapper>
              <MookhRow>
                {this.props.events.map((event, index) => (
                  <MookhCol
                    key={event.id}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                  >
                    <Panel
                      onError={this.handleError}
                      event={event}
                      key={event.id}
                    />
                  </MookhCol>
                ))}
              </MookhRow>
            </Wrapper>
          </InfiniteScroll>
        </EventPanelsWrap>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          {isInfiniteLoading && <Spin size="large" />}
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ eventPanels }) => ({
  // events: chunk(eventPanels.events, getItemsPerRow(deviceWidth)),
  events: eventPanels.events,
  appState: eventPanels.appState,
  pagination: eventPanels.pagination,
  isInfiniteLoading: eventPanels.isInfiniteLoading
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchMoreEvents: page => dispatch(fetchMoreEvents(page))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'eventPanels', reducer });

export default compose(withReducer, withConnect)(EventPanels);

// <EventPanelsWrap>
//   <InfiniteScroll
//     initialLoad={false}
//     pageStart={0}
//     loadMore={this.handleInfiniteLoad}
//     hasMore={hasMore}
//     useWindow
//   >
//     <Wrapper>
//       {this.props.events.map((v, i) => (
//         <MookhRow key={`${i}${Math.random()}`}>
//           {v.map((event, index) => (
//             <MookhCol
//               key={event.id}
//               xs={24}
//               sm={12}
//               md={12}
//               lg={8}
//               xl={8}
//             >
//               <Panel
//                 onError={this.handleError}
//                 event={event}
//                 key={event.id}
//               />
//             </MookhCol>
//           ))}
//         </MookhRow>
//       ))}
//     </Wrapper>
//   </InfiniteScroll>
// </EventPanelsWrap>