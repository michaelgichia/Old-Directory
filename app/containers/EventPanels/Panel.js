import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import Img from 'components/Img';
import { randomColor } from 'utils/color-generator';
import logo from './logo.jpg';
import { NavLink } from 'react-router-dom';
import { LogoDiv,  PanelImgWrap, PanelEventInfo, PanelWrap, EventLink } from "./StyledComponents";

export class Panel extends PureComponent {
  render() {
    const { event } = this.props;
    return (
      <PanelWrap>
        <LogoDiv>
          <div>
            <Img
              src={event.event_poster ==! null ? event.event_poster:""}
              alt=""
              onError={this.props.onError}
              id={event.id}
            />
          </div>
        </LogoDiv>
        <PanelImgWrap>
          <NavLink to={`/tickets/${event.id}`}>
            <Img
              src={event.event_poster ==! null ? event.event_poster:""}
              alt=""
              onError={this.props.onError}
              id={event.id}
            />
          </NavLink>
        </PanelImgWrap>
        <PanelEventInfo>
          <NavLink to={`/tickets/${event.id}`} alt="event">
            <h6>{event.event_name}</h6>
            <h6> by {event.store_name}</h6>
          </NavLink>
          <div
            dangerouslySetInnerHTML={{
              __html: event.event_description
            }}
          />
        </PanelEventInfo>
        <EventLink to={`/tickets/${event.id}`}>
          VIEW STORE
          <Icon type="arrow-right" />
        </EventLink>
      </PanelWrap>
    );
  }
}

export default Panel;
