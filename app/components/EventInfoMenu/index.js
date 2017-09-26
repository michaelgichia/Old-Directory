/**
*
* EventInfoMenu
*
*/

import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import "!!style-loader!css-loader!./invent-info-menu.css";

class EventInfoMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="product-title">
          <h4>TEDx LAVINGTON WOMEN: INDEPENDENT EVENT</h4>
        </div>
        <div className="description header">
          <h5>
            <Icon name="clock" />FRIDAY 28 OCT 17:00-23:00 // 15 DAYS TO GO
          </h5>
          <h5>
            <Icon name="marker" />BRAEBURN THEATER OFF GITANGA //
            <a href="/maps">GET DIRECTIONS</a>
          </h5>
        </div>
      </div>
    );
  }
}

EventInfoMenu.propTypes = {

};

export default EventInfoMenu;
