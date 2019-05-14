import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import Routes from './navigation/Routes';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;