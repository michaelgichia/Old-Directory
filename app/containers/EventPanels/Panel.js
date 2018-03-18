import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import Img from 'components/Img';
import { randomColor } from 'utils/color-generator';
import logo from './logo.jpg';

const PanelWrap = styled.div`
  font-size: 14px;
  display: block;
  position: relative;
  background-color: #f6f3ee;
  transform: translateZ(0);
  transition: transform 0.3s ease-in-out;

@media (min-width: 576px) {
  &:hover {
    box-shadow: rgba(45, 45, 45, 0.05) 0px 2px 2px,
      rgba(49, 49, 49, 0.03) 0px 4px 4px, rgba(42, 42, 42, 0.03) 0px 8px 8px,
      rgba(32, 32, 32, 0.03) 0px 16px 16px, rgba(49, 49, 49, 0.02) 0px 32px 32px,
      rgba(35, 35, 35, 0.03) 0px 64px 64px;
    transform: translate(0, -1px);
  }
}
`;

const PanelImgWrap = styled.div`
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 250px;
  background-size: cover;
  background-color: #faea29;

  @media (max-width: 576px) {
    height: 300px;
  }

  & > a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const PanelEventInfo = styled.div`
  width: 100%;
  color: #343434;
  padding-top: 24px;
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 8px;
  box-sizing: border-box;

  & > a {
    display: block;
    padding-bottom: 8px;
    width: 100%;
    text-decoration: none;
    color: #343434;
    overflow: hidden;
  }

  & > a:nth-child(1) {
    font-weight: 500;
  }

  & h6:nth-child(1) {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 22px;
    height: 44px;
    height: 44px;
    margin-bottom: 0;
  }

  & h6:nth-child(2) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 300px;
    color: #807d7d;

    &:hover {
      text-decoration: underline;
    }
  }

  & > div,
  & > p {
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 14px;
    height: 29px;
    margin: 0 0 14px 0;
  }
`;


const EventLink = styled(NavLink)`
  display: block;
  width: 100%;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 1px;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  color: #343434;
  box-sizing: border-box;
  border-top: 1px solid #e6e1e1;
  transition: all 0.3s ease-in-out;
  @media (min-width: 576px) {
    &:hover {
      color: #31383e;
      text-decoration: underline;
      transform: translate(4px);
    }
  }

  & > i {
    margin-left: 8px;
    font-size: 13px;
    font-weight: 700;
  }
`;

const LogoDiv = styled.div`
  background-color: #f6f3ee;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  top: calc(50% - 30px);
  right: 16px;

  @media (max-width: 576px) {
    top: calc(50% - 20px);
  }

  & > div {
    width: 60px;
    height: 60px;
    margin: 3px;
    overflow: hidden;
    background-color: #6a6364;

    @media (max-width: 576px) {
      width: 80px;
      height: 80px;
    }

    & > img {
      width: 60px;

      @media (max-width: 576px) {
        width: 80px;
      }
    }
  }
`

export class Panel extends PureComponent {
  render() {
    const { event } = this.props;
    return (
      <PanelWrap>
        <LogoDiv>
            <div>
              <img
                src={logo}
                alt=""
              />
            </div>
        </LogoDiv>
        <PanelImgWrap>
          <NavLink to={`/tickets/${event.id}`}>
            <Img
              src={event.event_poster}
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