import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// BarHopper components
import Login from './Login';
import Dashboard from './Dashboard';
import PublicHomePage from './PublicHomePage';
import Register from './Register';

// Material-UI Pickers
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

ReactDOM.render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={localStorage.getItem("Token") ? Dashboard : PublicHomePage}/>
                    <Route exact path="/home" component={PublicHomePage} />
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </BrowserRouter>
    </MuiPickersUtilsProvider>, document.getElementById('root'));

registerServiceWorker();
