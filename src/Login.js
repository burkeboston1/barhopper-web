// React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Material-UI
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';

// BarHopper Components
import Header from './Header';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            login: false,
            passwordError: false,
            emailError: false,
            bar_id: "",
            token: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    validateInput = function() {
        var emailError = !this.state.email;
        var passwordError = !this.state.password;
        this.setState({emailError: emailError, passwordError: passwordError});
        return !(emailError || passwordError);
    }

    onSubmit = function() {
        
        if (this.validateInput()) {
            const loginUrl = 'https://barhopperapi.herokuapp.com/api/authenticate';

            var data = {
                method: 'POST',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            fetch(loginUrl, data)
                .then((res) => {return res.json();})
                .then((res) =>{
                    if (res.success === true) {
                        this.setState({login: true, bar_id: res.desc_id, token: res.token});
                    } else {
                        this.setState({emailError: true, passwordError: true});
                    }
                });
        }
    };

    render() {
        if (this.state.login) {
            return <Redirect push to={{pathname: "/dashboard", bar_id: this.state.bar_id, token: this.state.token}}/>;
        }

        return(<div className="Login">
            <Header loggedIn={false}/>
            <br />
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}><Card><CardContent>
                    <Grid container>
                    <Grid item xs={5}>
                        <Typography style={{marginTop: "20px"}} variant="display1">
                            Login to BarHopper
                        </Typography>
                        <br />
                        <Typography variant="subheading">
                            Login to continue promoting your bar.</Typography>
                        <br />
                    </Grid>
                    <Grid item xs={7} id="loginForm">
                        <form style={{margin: "auto"}}>
                            <TextField required fullWidth id="email" label="Email" error={this.state.emailError} value={this.state.email} margin="dense" onChange={this.handleChange('email')}/>
                            <TextField required fullWidth id="password" label="Password" type="password" error={this.state.passwordError} value={this.state.password} margin="dense" onChange={this.handleChange('password')}/>
                            <div style={{height: "150px"}}></div>
                            <Button variant="flat" fullWidth style={{backgroundColor: "#fdcd4c", color: "white", marginTop: "10px"}} onClick={this.onSubmit}>Login</Button>
                        </form>
                    </Grid>
                    </Grid>
                </CardContent></Card></Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </div>)
    }
}