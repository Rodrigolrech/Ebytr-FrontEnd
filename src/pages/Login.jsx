import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { login } from '../services/APIConnections';
import ContextEbytr from '../store/ContextEbytr';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { setToken } = useContext(ContextEbytr);

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.token !== undefined) {
      setToken(response.token);
      setLoginError('');
      history.push('/tasks');
    } else {
      setLoginError(response.message);
    }
  };

  const handleClickCreateUser = () => {
    history.push('/newUser');
  };

  return (
    <Form className="login-form">
      <h1 className="text-center">
        Ebtry
        To Do List
      </h1>
      <Form.Group controlId="formBasicEmail" className="form-group">
        <Form.Control
          className="form-input"
          type="email"
          placeholder="Enter Ebtry email"
          data-testid="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          className="form-input"
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      { loginError }
      <Button
        className="form-button"
        type="submit"
        data-testid="login-submit-btn"
        onClick={handleClickLogin}
      >
        Login
      </Button>
      <Button
        className="form-button"
        type="submit"
        data-testid="createUser-submit-btn"
        onClick={handleClickCreateUser}
      >
        Create New User
      </Button>
    </Form>
  );
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
