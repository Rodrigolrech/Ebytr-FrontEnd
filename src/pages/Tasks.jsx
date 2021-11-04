import React, { useContext, useEffect, useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

import ContextEbytr from '../store/ContextEbytr';
import { getAllTasks } from '../services/APIConnections';
import Task from './components/Task';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(ContextEbytr);

  useEffect(() => {
    const allTasks = async () => getAllTasks(token);
    console.log(allTasks);
    setTasks(allTasks);
  }, []);
  console.log(tasks);
  return (
    <ListGroup>
      { tasks.map((task) => <Task task={task} />)}
    </ListGroup>
  );
}
