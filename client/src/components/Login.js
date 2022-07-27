import React from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from './Message';
import Loader from './Loader';
import FormContainer from './FormContainer';
import { login } from '../redux/actions/user';

const Login = ({ location }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : '';

  React.useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className='theme-color'>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className='my-3' type='submit' variant='dark'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Haven't Registered?{' '}
          <Link
            className='link'
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            <span className='theme-color'>Register</span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
