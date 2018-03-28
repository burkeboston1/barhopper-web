import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import {Link, Redirect} from 'react-router-dom';
import Typography from 'material-ui/Typography';

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
            emailError: false
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
        this.setState({emailError: emailError});
        this.setState({passwordError: passwordError});
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

            fetch(loginUrl, data).then((res) => {
                console.log('Response came back with status ' + res.status);
                if (res.status == 200) {
                    this.setState({login: true});
                } else {
                    this.setState({emailError: true});
                    this.setState({passwordError: true});
                }
            });
        }
    };

    render() {
        if (this.state.login) {
            return <Redirect push to="/dashboard" />;
        }

        return(<div className="Signup">
            <Header />

            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4} id="loginForm">
                    <Typography style={{marginTop: "20px", textAlign: "center"}} variant="headline" color="inherit">
                        Login to BarHopper
                    </Typography>
                    <form style={{margin: "auto"}}>
                        <TextField required fullWidth id="email" label="Email" error={this.state.emailError} value={this.state.email} margin="normal" onChange={this.handleChange('email')}/>
                        <TextField required fullWidth id="password" label="Password" type="password" error={this.state.passwordError} value={this.state.password} margin="normal" onChange={this.handleChange('password')}/>
                        <br />
                        <br />
                        <Button variant="flat" fullWidth style={{backgroundColor: "#fdcd4c"}} onClick={this.onSubmit}>Login</Button>
                        <Link to="/register"><Button variant="flat" fullWidth style={{marginTop: "5px"}}>Register</Button></Link>
                    </form>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </div>)
    }
}
