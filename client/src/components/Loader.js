import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ height, width }) => {
  return (
    <Spinner
      animation='grow'
      role='status'
      style={{
        width: height,
        height: width,
        margin: 'auto',
        display: 'block',
        color: 'rgb(255, 83,80, 0.6)',
        marginTop: '20vh',
      }}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
};

Loader.defaultProps = {
  height: '200px',
  width: '200px',
};

export default Loader;
