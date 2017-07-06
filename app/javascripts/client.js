import React from 'react';
import ReactDOM from 'react-dom';
import Main from './basepage/AppTheme.js';
import HomeDetail from './basepage/DetailAppTheme.js';
import {Router, Route, browserHistory} from 'react-router';
ReactDOM.render((<Router history = {browserHistory}>
    <Route path="/home" component={Main}/>
    <Route path="/homedetail" component={HomeDetail}/>
</Router>),document.getElementById('Main'));

