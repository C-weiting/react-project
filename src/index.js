import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@/styles/base.less';
import '@/styles/reset-antd.less';
import '@/styles/font.less';
import '@/utils/flexible.js';
import store from '@/store';
import Layout from '@/views/Layout';
import Message from '@/views/Message';
import Service from '@/views/Service'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/message' component={Message}></Route>
        <Route path='/service' component={Service}></Route>
        <Route path='/' component={Layout}></Route>
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));