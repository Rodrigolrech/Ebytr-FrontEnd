import React, { useContext, useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import ContextEbytr from '../store/ContextEbytr';
import { getAllTasks } from '../services/APIConnections';
import Task from '../pages/components/task'

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(ContextEbytr);

  useEffect(() => {
    const allTasks = async () => getAllTasks(token);
    console.log(allTasks);
    setTasks(allTasks);
  }, []);

  return (
    <ListGroup>
      { tasks.map((task) => <Task task={task} />)}
    </ListGroup>
  );
}
