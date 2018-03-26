import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Signup from './Signup';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login} />
        </Switch>
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
