import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import Provider from './store/Provider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Provider>
            <Route exact path="/" component={Login} />
            <Route exact path="/tasks" />
            <Route exact path="/newUser" component={NewUser} />
            <Route exact path="/tasks" component={tasks} />
          </Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
