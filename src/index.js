import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@/styles/base.less';
import store from '@/store';
import Login from '@/views/Login';
import Home from '@/views/Home';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));