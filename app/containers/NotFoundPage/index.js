/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import EventNavBar from 'containers/EventNavBar';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <EventNavBar />
        <div style={{height: "75vh", textAlign: "center"}}>
          <h1 style={{marginTop: 120}}>404</h1>
          <h1 style={{marginTop: 30}}>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
      </div>
    );
  }
}
