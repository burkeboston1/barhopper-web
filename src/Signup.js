// React
import React, { Component } from 'react';

// Material UI
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';

// BarHopper components

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            tempPassword: "",
            password: "",
            confirmPassword: "",
            passwordsMatch: true,
            nameError: false,
            emailError: false,
            tempPasswordError: false,
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

            const verifyUrl = 'https://barhopperapi.herokuapp.com/api/verify';

            var data = {
                method: 'POST',
                body: JSON.stringify({
                    email: this.state.email,
                    tempPassword: this.state.tempPassword, 
                    password: this.state.password, 
                    name: this.state.name
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            fetch(verifyUrl, data)
                .then((res) => {return res.json();})
                .then((resJson) => {
                    if (resJson.success === true) {
                        this.props.handleNext({token: resJson.token});
                    } else {
                        this.setState({emailError: true, tempPasswordError: true});
                    }
                });
        }
    };

    render() {
        return(
            <div className="Signup">
                <Card><CardContent>
                        <Grid container>
                        <Grid item xs={5}>
                            <Typography style={{marginTop: "20px"}} variant="display1">
                                    Register with BarHopper
                            </Typography>
                            <br />
                            <Typography variant="subheading">If you own or manage a bar and would like to use BarHopper to promote
                                your business, please contact the BarHopper team.</Typography>
                            <br />
                            <Typography variant="subheading">If you've already been verified and have a temporary password, just fill
                                out the form on the right.</Typography>
                        </Grid>
                        <Grid item xs={7} id="signupForm">
                            <form style={{margin: "auto"}}>
                                <TextField required fullWidth id="name" label="Name" value={this.state.name} error={this.state.nameError} margin="dense" onChange={this.handleChange('name')}/>
                                <br />
                                <TextField required fullWidth id="email" label="Email" value={this.state.email} error={this.state.emailError} margin="dense" onChange={this.handleChange('email')}/>
                                <br />
                                <TextField required fullWidth id="temp-password" type="password" label="Temporary Password" value={this.state.tempPassword} margin="dense" onChange={this.handleChange('tempPassword')} error={this.state.tempPasswordError}></TextField>
                                <br />
                                <TextField required fullWidth id="password" label="New Password" type="password" error={!this.state.passwordsMatch} value={this.state.password} margin="dense" onChange={this.handleChange('password')}/>
                                <br />
                                <TextField required fullWidth id="confirm-password" type="password" error={!this.state.passwordsMatch} label="Confirm New Password" value={this.state.confirmPassword} margin="dense" onChange={this.handleChange('confirmPassword')}/>
                                <br />
                                <Button variant="flat" fullWidth style={{backgroundColor: "#fdcd4c", color: "white", marginTop: "10px"}} onClick={this.onSubmit}>Register</Button>
                            </form>
                        </Grid>
                        </Grid>
                    </CardContent></Card>
            </div>
        )
    }
}

export default Signup;
