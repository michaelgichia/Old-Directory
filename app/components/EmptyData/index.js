/**
*
* EmptyData
*
*/

import React from 'react';
import './empty-data.css';

const notFoundImage = 'http://res.cloudinary.com/dw3arrxnf/image/upload/v1511331890/imageedit_8_7373918276_ku8kiu.png';

class EmptyData extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="not-found-wrap">
          <div className="not-found-image">
            <img src={notFoundImage} alt="not found" />
          </div>
          <div>
            <h3>{this.props.message}</h3>
          </div>
        </div>
      </div>
    );
  }
}

EmptyData.propTypes = {};

export default EmptyData;
