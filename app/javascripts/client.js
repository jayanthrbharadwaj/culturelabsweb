import React from 'react';
import ReactDOM from 'react-dom';
import Main from './basepage/AppTheme.js';
import HomeDetail from './basepage/DetailAppTheme.js';
import {Router, Route, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GAEventLogger from './analytics/GAEventLogger';
injectTapEventPlugin();
GAEventLogger.initialiseGA();
ReactDOM.render((<Router history = {browserHistory}>
    <Route path="/home" component={Main}/>
    <Route path="/homedetail" component={HomeDetail}/>
    <Route path="/seriesdetail" component={HomeDetail}/>
</Router>),document.getElementById('Main'));

