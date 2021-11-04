import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { newTask } from '../services/APIConnections';
import ContextEbytr from '../store/ContextEbytr';

export default function NewTask({ history }) {
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [newTaskError, setNewTaskError] = useState('');
  const { token } = useContext(ContextEbytr);

  const handleClickCreateTask = async (e) => {
    e.preventDefault();
    const response = await newTask(taskDescription, status, token);
    if (response.username !== undefined) {
      setNewTaskError('');
      history.push('/');
    } else {
      setNewTaskError(response.message);
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <Form className="create-task-form">
      <h1 className="text-center">
        Create New Task
      </h1>
      <Form.Group controlId="formBasicText">
        <Form.Control
          className="form-input"
          type="text"
          placeholder="task-description"
          data-testid="task-description-input"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Select aria-label="select-task-status" onChange={handleChange}>
          <option>Select Task Status</option>
          <option value="Pendente">Pendente</option>
          <option value="em andamento">em andamento</option>
          <option value="Pronto">Pronto</option>
        </Form.Select>
      </Form.Group>
      { newTaskError }
      <Button
        className="form-button"
        type="submit"
        data-testid="createTask-submit-btn"
        onClick={handleClickCreateTask}
      >
        Create New Task
      </Button>
    </Form>
  );
}
NewTask.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
