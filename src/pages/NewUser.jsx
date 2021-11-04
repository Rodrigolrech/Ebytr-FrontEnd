import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { newUser } from '../services/APIConnections';

export default function NewUser({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [newUserError, setNewUserError] = useState('');

  const handleClickCreateUser = async (e) => {
    e.preventDefault();
    const response = await newUser(username, email, password, role);
    if (response.username !== undefined) {
      setNewUserError('');
      history.push('/');
    } else {
      setNewUserError(response.message);
    }
  };

  const handleChange = (e) => {
    setRole(e.target.value);
    console.log(role);
  };

  return (
    <Form className="create-user-form">
      <h1 className="text-center">
        Ebtry
        To Do List
      </h1>
      <Form.Group controlId="formBasicText">
        <Form.Control
          className="form-input"
          type="text"
          placeholder="Username"
          data-testid="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
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
      <Form.Group>
        <Form.Select aria-label="Default select example" onChange={handleChange}>
          <option>Select your role</option>
          <option value="Developer">Developer</option>
          <option value="Scrum Master">Scrum Master</option>
          <option value="Project Owner">Project Owner</option>
        </Form.Select>
      </Form.Group>
      { newUserError }
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
NewUser.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
