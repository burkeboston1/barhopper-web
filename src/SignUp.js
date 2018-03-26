import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import {Link} from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            passwordsMatch: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit = function() {
        // check password and confirm password match
        if (this.state.password !== this.state.confirmPassword) {
            // thing
            this.setState({
                passwordsMatch: false
            });
        } else {
            this.setState({
                passwordsMatch: true
            });
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

            fetch(signupUrl, data).then((res) => {
                console.log('Response came back with status ' + res.status);
            });
        }
    };

    render() {
        return(
            <div className="Signup">
                <AppBar position="static" color="default" style={{padding: "5px"}}>
                    <Toolbar>
                        <img src="barhopper-icon.png" alt="LOGO" style={{marginLeft: "100px", marginRight: "15px", width: "100px"}}/>
                        <Typography variant="title" color="inherit">
                            BarHopper
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} id="signupForm">
                        <Typography style={{marginTop: "20px", textAlign: "center"}} variant="display1" color="inherit">
                            Register with BarHopper
                        </Typography>
                        <form style={{margin: "auto"}}>
                            <TextField fullWidth id="name" label="Name" value={this.state.name} margin="normal" onChange={this.handleChange('name')}/>
                            <br />
                            <TextField fullWidth id="email" label="Email" value={this.state.email} margin="normal" onChange={this.handleChange('email')}/>
                            <br />
                            <TextField fullWidth id="password" label="Password" error={!this.state.passwordsMatch} value={this.state.password} margin="normal" onChange={this.handleChange('password')}/>
                            <br />
                            <TextField fullWidth id="confirm-password" error={!this.state.passwordsMatch} label="Confirm Password" value={this.state.confirmPassword} margin="normal" onChange={this.handleChange('confirmPassword')}/>
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
