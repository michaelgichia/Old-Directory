/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function NormalImg(props) {
  return (
    <img className={props.className} src={props.src} alt={props.alt} />
  );
}

// We require the use of src and alt, only enforced by react in dev mode
NormalImg.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

const Img = styled(NormalImg)`
  width: 100%;
`;

export default Img;

