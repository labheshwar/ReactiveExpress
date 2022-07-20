import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='grow'
      role='status'
      style={{
        width: '200px',
        height: '200px',
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

export default Loader;
