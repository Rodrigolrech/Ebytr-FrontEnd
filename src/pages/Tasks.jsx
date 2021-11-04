/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import ContextEbytr from '../store/ContextEbytr';
import { getAllTasks } from '../services/APIConnections';
import Task from './components/Task';

export default function Tasks({ history }) {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(ContextEbytr);
  console.log(tasks);
  const getTasks = async () => {
    const allTasks = await getAllTasks(token);
    setTasks(allTasks);
  };

  const handleClick = () => {
    history.push('/newTask');
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <ListGroup>
        {tasks.message ? tasks.message : tasks.map((task) => <Task task={task} key={task._id} />) }
      </ListGroup>
      <Button onClick={handleClick}>Create new task</Button>
    </div>
  );
}

Tasks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
