/**
*
* PosterModal
*
*/

import React from 'react';
import '!!style-loader!css-loader!./poster-modal.css';

class PosterModal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { productImage, openModal} = this.props;
    return (
      <div>
        <div id="modal-show" className="modal-wrap" style={{ display: openModal === true ? "block":"none" }}>
          <img src={productImage} alt="product" />
        </div>
      </div>
    );
  }
}

PosterModal.propTypes = {};

export default PosterModal;
