import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Provider from './store/Provider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Provider>
            <Route exact path="/" component={Login} />
            <Route exact path="/tasks" />
          </Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
