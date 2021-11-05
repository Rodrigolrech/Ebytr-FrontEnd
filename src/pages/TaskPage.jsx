/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import ContextEbytr from '../store/ContextEbytr';
import { getAllTasks, updateTask, deleteTask } from '../services/APIConnections';

export default function Tasks({ history, match }) {
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [updateTaskError, setUpdateTaskError] = useState('');
  const [task, setTask] = useState('');
  const [taskFoundError, setTaskFoundError] = useState('');
  const { token } = useContext(ContextEbytr);

  const getTasks = async () => {
    const { _id } = match.params;
    const allTasks = await getAllTasks(token);
    if (allTasks[0]) {
      console.log(allTasks);
      const taskFound = allTasks.find((t) => t._id === _id);
      if (taskFound) {
        setTask(taskFound);
        setStatus(taskFound.status);
        setTaskFoundError('');
      } else {
        setTaskFoundError('Task not found');
      }
    }
  };

  const handleClickUpdateTask = async (e) => {
    e.preventDefault();
    const { _id } = match.params;
    const updatedTask = await updateTask(_id, taskDescription, status, token);
    console.log(updatedTask);
    if (updatedTask.status) {
      setUpdateTaskError('');
      history.push('/tasks');
    } else {
      setUpdateTaskError(updatedTask.message);
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleClickDeleteTask = async (e) => {
    e.preventDefault();
    const { _id } = match.params;
    const deletedTask = await deleteTask(_id, token);
    console.log(deletedTask);
    history.push('/tasks');
  };

  useEffect(() => {
    getTasks();
    console.log(task.creatorUser);
  }, []);

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          <p>
            Description
            {' '}
            {task.taskDescription}
          </p>
        </ListGroup.Item>
        <ListGroup.Item>
          Creator
          { task.creator ? <p>{task.creatorUser.username}</p> : '' }
        </ListGroup.Item>
        <ListGroup.Item>
          Status
          <p>{task.status}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          { task.taskDescriptionHistory ? task.taskDescriptionHistory.map((d) => (
            <p>
              Old Description
              {` ${d} `}
            </p>
          )) : ''}
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
        <Button
          className="form-button"
          type="submit"
          data-testid="deleteTask-submit-btn"
          onClick={handleClickDeleteTask}
        >
          Delete Task
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
