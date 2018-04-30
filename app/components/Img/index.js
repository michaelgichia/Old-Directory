/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import noImage from 'images/no_image.svg';

function NormalImg({ src, className, alt }) {
  return (
    <img className={className} src={src} alt={alt} />
  );
}

// We require the use of src and alt, only enforced by react in dev mode
NormalImg.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

const Img = styled(NormalImg)`
  width: 100%;
  min-height: 100%;
`;

export default Img;