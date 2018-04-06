// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

// BarHopper components
import Header from './Header';
import CreateBar from './CreateBar';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            passwordsMatch: true,
            nameError: false,
            emailError: false,
            registered: false
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
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var nameError = !this.state.name;
        var emailError = !this.state.email
                      || !emailRegex.test(this.state.email.toLowerCase());
        var passwordError = this.state.password !== this.state.confirmPassword
                         || !this.state.password;
        this.setState({nameError: nameError});
        this.setState({emailError: emailError});
        this.setState({passwordsMatch: !passwordError});
        return !(nameError || emailError || passwordError);
    }

    onSubmit = function() {
        // check password and confirm password match
        if (this.validateInput()) {

            const signupUrl = 'https://barhopperapi.herokuapp.com/api/signup';
            var data = {
                method: 'POST',
                body: JSON.stringify({
                    email: this.state.email,
                    name: this.state.name,
                    password: this.state.password,
                    admin: true
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            fetch(signupUrl, data)
                .then((res) => {return res.json();})
                .then((res) =>{
                    if (res.success === true) {
                        this.setState({registered: true, token: res.token, bar_id: res.bar_id});
                    }
                });
        }
    };

    render() {
        if (this.state.registered) {
            return (<div><Header /><CreateBar token={this.state.token}/></div>);
        }

        return(
            <div className="Signup">
                <Header />

                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} id="signupForm">
                        <Typography style={{marginTop: "20px", textAlign: "center"}} variant="headline" color="inherit">
                            Register with BarHopper
                        </Typography>
                        <form style={{margin: "auto"}}>
                            <TextField required fullWidth id="name" label="Name" value={this.state.name} error={this.state.nameError} margin="normal" onChange={this.handleChange('name')}/>
                            <br />
                            <TextField required fullWidth id="email" label="Email" value={this.state.email} error={this.state.emailError} margin="normal" onChange={this.handleChange('email')}/>
                            <br />
                            <TextField required fullWidth id="password" label="Password" type="password" error={!this.state.passwordsMatch} value={this.state.password} margin="normal" onChange={this.handleChange('password')}/>
                            <br />
                            <TextField required fullWidth id="confirm-password" type="password" error={!this.state.passwordsMatch} label="Confirm Password" value={this.state.confirmPassword} margin="normal" onChange={this.handleChange('confirmPassword')}/>
                            <br />
                            <br />
                            <Button variant="flat" fullWidth style={{backgroundColor: "#fdcd4c"}} onClick={this.onSubmit}>Register</Button>
                            <Link to="/login"><Button variant="flat" fullWidth style={{marginTop: "5px"}}>Login</Button></Link>
                        </form>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </div>
        )
    }
}

export default Signup;
