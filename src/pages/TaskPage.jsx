/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import ContextEbytr from '../store/ContextEbytr';
import { getAllTasks } from '../services/APIConnections';

export default function Tasks({ history, params }) {
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [updateTaskError, setUpdateTaskError] = useState('');
  const [task, setTask] = useState([]);
  const [taskFoundError, setTaskFoundError] = useState('');
  const { token } = useContext(ContextEbytr);

  const getTasks = async () => {
    const { _id } = params;
    const allTasks = await getAllTasks(token);
    const taskFound = allTasks.find((t) => t._id === _id);
    if (taskFound) {
      setTask(taskFound);
      setStatus(taskFound.status);
      setTaskFoundError('');
    } else {
      setTaskFoundError('Task not found');
    }
  };

  const handleClickUpdateTask = async () => {
    const { _id } = params;
    const updatedTask = await updateTaskError(_id, taskDescription, status);
    if (updatedTask.status) {
      setUpdateTaskError('');
      history.push('/');
    } else {
      setUpdateTaskError(updatedTask.message);
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          <p>{task.taskDescription}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>{task.creator}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>{task.status}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          { task.taskDescriptionHistory ? <p>{task.taskDescriptionHistory}</p> : ''}
        </ListGroup.Item>
      </ListGroup>
      <Form className="update-task-form">
        <h1 className="text-center">
          Update Task
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
          <Form.Select aria-label="select-task-status" onChange={handleChange} value={status}>
            <option>Select Task Status</option>
            <option value="Pendente">Pendente</option>
            <option value="em andamento">em andamento</option>
            <option value="Pronto">Pronto</option>
          </Form.Select>
        </Form.Group>
        { updateTaskError }
        <Button
          className="form-button"
          type="submit"
          data-testid="updateTask-submit-btn"
          onClick={handleClickUpdateTask}
        >
          Update Task
        </Button>
      </Form>
      { taskFoundError }

    </div>
  );
}

Tasks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  params: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
