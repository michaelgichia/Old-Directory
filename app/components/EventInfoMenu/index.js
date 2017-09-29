/**
*
* EventInfoMenu
*
*/

import React from 'react';
import { Icon } from 'semantic-ui-react';
import '!!style-loader!css-loader!./invent-info-menu.css';

class EventInfoMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="event-information-wrap">
        <div className="product-title">
          <h3>TEDx LAVINGTON WOMEN: INDEPENDENT EVENT</h3>
        </div>
        <div className="description header">
          <h5>
            <Icon name="clock" />FRIDAY 28 OCT 17:00-23:00 // 15 DAYS TO GO
          </h5>
          <a href="#">
            <Icon name="marker" />BRAEBURN THEATER OFF GITANGA
          </a>
        </div>
      </div>
    );
  }
}

EventInfoMenu.propTypes = {

};

export default EventInfoMenu;
