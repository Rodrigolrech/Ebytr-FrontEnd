import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function Task({ task, history }) {
  const [taskSetted, setTask] = useState({});

  useEffect(() => {
    setTask(task);
  }, []);

  const handleClick = () => {
    const { _id } = taskSetted;
    history.push(`/task/${_id}`);
  };

  return (
    <ListGroup.Item>
      {taskSetted.taskDescription}
      <Button onClick={handleClick}>Update Task</Button>
    </ListGroup.Item>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    taskDescription: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
