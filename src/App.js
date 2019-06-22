import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./login/LogInPage.js'));



class App extends Component {
 
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/about" name="Home" render={props => <DefaultLayout {...props}/>} />
             / <Route exact path="/login" name="Login" render={props => <Login {...props}/>} />
              <Route exact path="/" name="Login" render={props => <Login {...props}/>} />
              <Route path="/" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
