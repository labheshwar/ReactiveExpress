import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p className='theme-color'>&copy; Reactive Express 2022</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
