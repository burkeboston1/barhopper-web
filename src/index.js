import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// BarHopper components
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';

// Material-UI Pickers
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

ReactDOM.render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/register" component={Signup}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    </MuiPickersUtilsProvider>, document.getElementById('root'));

registerServiceWorker();
