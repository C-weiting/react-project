import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/views/Home';
import Login from '@/views/Login';

import Community from '@/views/Community'
import Service from '@/views/Service'
import './layout.less';

function Layout (props) {
    const { path } = useRouteMatch();

    return (
        <div className="layout-content">
            <Header />
            <div className="content">
                <Switch>
                    <Route exact path={path} component={Home}></Route>
                    <Route path={`${path}login`} component={Login}></Route>
                    <Route path={`${path}community`} component={Community}></Route>
                    <Route path={`${path}service`} component={Service}></Route>
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;