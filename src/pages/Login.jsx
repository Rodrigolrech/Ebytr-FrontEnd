import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { login } from '../services/APIConnections';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleClick = async () => {
    const response = await login(email, password);
    if (response.status === 200) {
      const token = response.message;
      setLoginError('');
    } else {
      setLoginError(response.message);
    }
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
        onClick={handleClick}
      >
        Entrar
      </Button>
    </Form>
  );
}

export default Login;
